import {
  Inject,
  Injectable,
  InternalServerErrorException,
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

@Injectable()
export class OfficeDocsService {
  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @InjectS3() private readonly s3: S3,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    private readonly utils: UtilsService,
  ) {}

  async pingWorker() {
    this.converterWorker.emit('ping_from_service', {
      message: 'PING',
    });
  }

  async officeToPdf(file: Express.Multer.File) {
    const jobId = uuid();
    const meta = this.utils.collectFileMetadata(file);
    this.logger.info(`File received: ${meta.fileName}`, meta);
    await this.uploadToS3(jobId, file, meta);
    await this.createJob(jobId);
    return { message: 'File uploaded' };
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
      this.logger.info(`File uploaded to S3: ${fileMeta.fileName}`, fileMeta);
    } catch (e) {
      this.logger.error('Error while uploading file to S3', e);
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
      this.logger.info(`Job created: ${jobId}`);
    } catch (e) {
      this.logger.error('Error while creating job', e);
      throw new InternalServerErrorException();
    }
  }

  async jobAcknowledged(jobId: string) {
    try {
      await this.redis.hset(`jobs:${jobId}`, 'status', JobStatus.PROCESSING);
      this.logger.info(`Job acknowledged: ${jobId}`);
    } catch (e) {
      this.logger.error('Error while acknowledging job', e);
      throw new InternalServerErrorException();
    }
  }

  async jobCompleted(job: Job) {
    switch (job.status) {
      case JobStatus.COMPLETED:
        this.logger.info(`Job completed: ${job.id}`);
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.COMPLETED);
        break;
      case JobStatus.FAILED:
        this.logger.warn(`Job failed: ${job.id}`);
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        break;
      default:
        this.logger.error('Invalid job status', job);
        await this.redis.hset(`jobs:${job.id}`, 'status', JobStatus.FAILED);
        break;
    }
  }
}
