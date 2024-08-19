import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ClientProxy } from '@nestjs/microservices';
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import * as libre from 'libreoffice-convert';
import { JobStatus } from './interfaces';

@Injectable()
export class OfficeDocsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectS3() private readonly s3: S3,
    @Inject('CONVERTER_SERVICE') private readonly converterService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async officeToPdf(fileId: string) {
    try {
      this.logger.info(`Received conversion request ${fileId}`, {
        file_id: fileId,
        file_type: 'office',
      });
      this.converterService.emit('job_acknowledged', fileId);

      const file = await this.downloadFile(fileId);
      const output = await this.convertToPdf(file);
      await this.uploadFile(output, fileId);
      this.logger.info(`File converted ${fileId}`, {
        file_id: fileId,
        file_type: 'office',
      });
      this.converterService.emit('job_completed', {
        id: fileId,
        status: JobStatus.COMPLETED,
      });
    } catch (e) {
      this.logger.error(`Error while converting file ${fileId}`, e);
      this.converterService.emit('job_completed', {
        id: fileId,
        status: JobStatus.FAILED,
      });
    }
  }

  async downloadFile(fileId: string) {
    const file = await this.s3.getObject({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: `input/${fileId}`,
    });
    const buffer = Buffer.from(await file.Body.transformToByteArray());
    return buffer;
  }

  async uploadFile(file: Buffer, fileId: string) {
    await this.s3.putObject({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: `output/${fileId}.pdf`,
      Body: file,
    });
  }

  async convertToPdf(file: Buffer) {
    const convertAsync = promisify(libre.convert);
    const pdfBuf = await convertAsync(file, '.pdf', undefined);
    return pdfBuf;
  }
}
