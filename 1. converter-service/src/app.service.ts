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
import { v4 as uuid } from 'uuid';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { JobStatus } from './interfaces';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @InjectS3() private readonly s3: S3,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async pingWorker() {
    this.converterWorker.emit('ping_from_service', {
      message: 'PING',
    });
  }

  async officeToPdf(file: Express.Multer.File) {
    const fileId = uuid();
    await this.uploadToS3(file, fileId);
    await this.createJob(fileId);
    return { message: 'File uploaded' };
  }

  async uploadToS3(file: Express.Multer.File, fileId: string) {
    try {
      await this.s3.putObject({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: `input/${fileId}`,
        Body: Buffer.from(file.buffer),
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async createJob(fileId: string) {
    try {
      await this.redis.set(`jobs:${fileId}`, JobStatus.PENDING);
      this.converterWorker.emit('pdf_to_office', fileId);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async jobAccepted(fileId: string) {
    try {
      await this.redis.set(`jobs:${fileId}`, JobStatus.PROCESSING);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
