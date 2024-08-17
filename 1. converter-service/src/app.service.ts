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
    const id = uuid();
    await this.uploadToS3(file, id);
  }

  async uploadToS3(file: Express.Multer.File, id: string) {
    try {
      await this.s3.putObject({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: `input/${id}`,
        Body: Buffer.from(file.buffer),
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to upload file to storage',
      );
    }
  }
}
