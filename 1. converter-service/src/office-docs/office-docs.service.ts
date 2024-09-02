import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectS3, S3 } from 'nestjs-s3';
import { Logger } from 'winston';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { FileMetadata, JobStatus } from '../interfaces';
import { UtilsService } from 'src/utils/utils.service';
import { Job } from '../interfaces';
import { v4 as uuid } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OfficeDocsService {
  private redisSub: Redis;
  private readonly JOB_UPDATES_CHANNEL = 'job_updates';
  private jobUpdatesSubscription = new BehaviorSubject(null);

  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @InjectS3() private readonly s3: S3,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    private readonly utils: UtilsService,
  ) {
    this.redisSub = this.redis.duplicate();
    this.redisSub.subscribe(this.JOB_UPDATES_CHANNEL);
    this.redisSub.on('message', (channel, message) => {
      this.jobUpdatesSubscription.next(message);
    });
  }

  async officeToPdf(file: Express.Multer.File) {
    const jobId = uuid();
    const fileMeta = this.utils.collectFileMetadata(file);
    this.logger.info(`File received: ${fileMeta.fileName}`, {
      ...fileMeta,
      jobId,
    });
    await this.uploadToS3(jobId, file, fileMeta);
    await this.createJob(jobId);
    return { message: 'File uploaded', jobId };
  }

  async sendJobStatusUpdates(jobId: string) {
    const jobStatus = await this.redis.hget(`jobs:${jobId}`, 'status');
    if (!jobStatus) throw new NotFoundException('File not found');

    if (jobStatus === JobStatus.COMPLETED || jobStatus === JobStatus.FAILED) {
      return { jobId, status: jobStatus };
    }

    const subscription = this.jobUpdatesSubscription;
    console.log('Address:', subscription.toString());
    return this.jobUpdatesSubscription;
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
    return { url };
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

  async createJob(jobId: string) {
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

  async jobAcknowledged(jobId: string) {
    try {
      await this.redis.hset(`jobs:${jobId}`, 'status', JobStatus.PROCESSING);
      this.logger.info(`Job acknowledged: ${jobId}`, { jobId });
    } catch (e) {
      this.logger.error('Error while acknowledging job', { ...e, jobId });
      await this.redis.hset(`jobs:${jobId}`, 'status', JobStatus.FAILED);
      await this.publishJobUpdates(null, JobStatus.FAILED);
    }
  }

  async jobCompleted(job: Job) {
    switch (job.status) {
      case JobStatus.COMPLETED:
        this.logger.info(`Job completed: ${job.id}`, { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.COMPLETED);
        await this.publishJobUpdates(job.id, JobStatus.COMPLETED);
        break;
      case JobStatus.FAILED:
        this.logger.warn(`Job failed: ${job.id}`, { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        await this.publishJobUpdates(job.id, JobStatus.FAILED);
        break;
      default:
        this.logger.error('Invalid job status', { jobId: job.id });
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        await this.publishJobUpdates(job.id, JobStatus.FAILED);
        break;
    }
  }

  async publishJobUpdates(jobId: string, status: JobStatus) {
    await this.redis.publish(
      this.JOB_UPDATES_CHANNEL,
      JSON.stringify({
        jobId,
        status,
      }),
    );
  }
}
