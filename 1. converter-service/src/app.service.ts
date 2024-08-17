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
import { FileMetadata, JobStatus } from './interfaces';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class AppService {
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
    const meta = this.utils.collectFileMetadata(file);
    this.logger.info(`File received: ${meta.file_id}`, meta);
    await this.uploadToS3(file, meta);
    await this.createJob(meta);
    return { message: 'File uploaded' };
  }

  async uploadToS3(file: Express.Multer.File, meta: FileMetadata) {
    try {
      await this.s3.putObject({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: `input/${meta.file_id}`,
        Body: Buffer.from(file.buffer),
      });
      this.logger.info(`File uploaded to S3: ${meta.file_id}`, meta);
    } catch (e) {
      this.logger.error('Error while uploading file to S3', e);
      throw new InternalServerErrorException();
    }
  }

  async createJob(meta: FileMetadata) {
    try {
      await this.redis.set(`jobs_status:${meta.file_id}`, JobStatus.PENDING);
      await this.redis.hset('file_names', meta.file_id, meta.file_name);
      this.converterWorker.emit('pdf_to_office', meta.file_id);
      this.logger.info(`Job created: ${meta.file_id}`, meta);
    } catch (e) {
      this.logger.error('Error while creating job', e);
      throw new InternalServerErrorException();
    }
  }

  async jobAccepted(fileId: string) {
    try {
      await this.redis.set(`jobs:${fileId}`, JobStatus.PROCESSING);
      this.logger.info(`Job acknowledged: ${fileId}`);
    } catch (e) {
      this.logger.error('Error while acknowledging job', e);
      // throw new InternalServerErrorException();
    }
  }
}
