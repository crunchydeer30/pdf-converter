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
import { FileMetadata } from '../interfaces';
import { UtilsService } from 'src/utils/utils.service';
import { v4 as uuid } from 'uuid';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class OfficeDocsService {
  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @InjectS3() private readonly s3: S3,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    private readonly utils: UtilsService,
    private readonly jobsService: JobsService,
  ) {}

  async officeToPdf(file: Express.Multer.File) {
    const jobId = uuid();
    const fileMeta = this.utils.collectFileMetadata(file);
    this.logger.info(`File received: ${fileMeta.fileName}`, {
      ...fileMeta,
      jobId,
    });
    await this.uploadToS3(jobId, file, fileMeta);
    await this.jobsService.create(jobId);
    return { message: 'File uploaded', jobId };
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
