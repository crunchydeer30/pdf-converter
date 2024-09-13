import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { JobStatus, Job, FileMetadata } from 'src/interfaces';
import { Logger } from 'winston';
import { ClientProxy } from '@nestjs/microservices';
import {
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BehaviorSubject } from 'rxjs';
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { basename } from 'path';

@Injectable()
export class JobsService {
  private redisSub: Redis;
  private readonly JOB_UPDATES_CHANNEL = 'job_updates';
  private updatesObserver = new BehaviorSubject(null);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {
    this.redisSub = this.redis.duplicate();
    this.redisSub.subscribe(this.JOB_UPDATES_CHANNEL);
    this.redisSub.on('message', (channel, message) => {
      this.updatesObserver.next(JSON.parse(message));
    });
  }

  async status(jobId: string) {
    const status = await this.redis.hget(`jobs:${jobId}`, 'status');
    if (!status) throw new NotFoundException('File not found');
    return { jobId, status: status };
  }

  async progress(jobId: string) {
    const jobStatus = await this.redis.hget(`jobs:${jobId}`, 'status');
    if (!jobStatus) throw new NotFoundException('File not found');

    if (jobStatus === JobStatus.COMPLETED || jobStatus === JobStatus.FAILED) {
      return { jobId, status: jobStatus };
    }

    return this.updatesObserver;
  }

  async create(jobId: string) {
    try {
      await this.redis.hset(`jobs:${jobId}`, {
        id: jobId,
        status: JobStatus.PENDING,
      });
      await this.redis.zadd('jobs:timestamps', Date.now(), jobId);
      this.converterWorker.emit('office_to_pdf', jobId);
      this.logger.info(`Job created: ${jobId}`, jobId);
    } catch (e) {
      this.logger.error('Error while creating job', { ...e, jobId });
      throw new InternalServerErrorException();
    }
  }

  async acknowledge(jobId: string) {
    try {
      await this.redis.hset(`jobs:${jobId}`, 'status', JobStatus.PROCESSING);
      this.logger.info(`Job acknowledged: ${jobId}`, { jobId });
    } catch (e) {
      this.logger.error('Error while acknowledging job', { ...e, jobId });
      await this.redis.hset(`jobs:${jobId}`, 'status', JobStatus.FAILED);
      await this.publishUpdates(null, JobStatus.FAILED);
    }
  }

  async publishUpdates(jobId: string, status: JobStatus) {
    await this.redis.publish(
      this.JOB_UPDATES_CHANNEL,
      JSON.stringify({
        jobId,
        status,
      }),
    );
  }

  async complete(job: Job) {
    switch (job.status) {
      case JobStatus.COMPLETED:
        this.logger.info(`Job completed: ${job.id}`, { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.COMPLETED);
        await this.publishUpdates(job.id, JobStatus.COMPLETED);
        break;
      case JobStatus.FAILED:
        this.logger.warn(`Job failed: ${job.id}`, { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        await this.publishUpdates(job.id, JobStatus.FAILED);
        break;
      default:
        this.logger.error('Invalid job status', { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        await this.publishUpdates(job.id, JobStatus.FAILED);
        break;
    }
  }

  async download(jobId: string) {
    const jobStatus = await this.redis.hget(`jobs:${jobId}`, 'status');
    if (!jobStatus) throw new NotFoundException('File not found');

    if (jobStatus === JobStatus.PENDING || jobStatus === JobStatus.PROCESSING) {
      throw new ConflictException('File is being processed');
    }

    const data = await this.s3.listObjectsV2({
      Bucket: this.configService.get('S3_BUCKET'),
      Prefix: `output/${jobId}`,
    });
    if (!data.Contents.length) {
      throw new NotFoundException('File not found');
    }

    const command = new GetObjectCommand({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: data.Contents[0].Key,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    return { url, fileName: basename(data.Contents[0].Key) };
  }

  async uploadToS3(
    jobId: string,
    file: Express.Multer.File,
    fileMeta: FileMetadata,
  ) {
    try {
      await this.s3.putObject({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: `input/${jobId}/${fileMeta.fileName}`,
        Body: Buffer.from(file.buffer),
      });
      this.logger.info(
        `File uploaded to S3: input/${jobId}/${fileMeta.fileName}`,
        { ...fileMeta, jobId },
      );
    } catch (e) {
      this.logger.error('Error while uploading file to S3', { ...e, jobId });
      throw new InternalServerErrorException();
    }
  }
}
