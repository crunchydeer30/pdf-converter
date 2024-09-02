import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ClientProxy } from '@nestjs/microservices';
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import * as libre from 'libreoffice-convert';
import { JobStatus } from './interfaces';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class OfficeDocsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectS3() private readonly s3: S3,
    @Inject('CONVERTER_SERVICE') private readonly converterService: ClientProxy,
    private readonly utils: UtilsService,
    private readonly configService: ConfigService,
  ) {}

  async officeToPdf(jobId: string) {
    try {
      this.logger.info(`Received conversion request ${jobId}`, {
        jobId,
      });
      this.converterService.emit('job_acknowledged', jobId);

      const { buffer, fileName } = await this.downloadFile(jobId);
      const output = await this.convertToPdf(buffer);

      await this.uploadFile(output, jobId, fileName);
      this.logger.info(`File converted ${jobId}`, {
        file_id: jobId,
        file_type: 'office',
      });
      this.converterService.emit('job_completed', {
        id: jobId,
        status: JobStatus.COMPLETED,
      });
    } catch (e) {
      this.logger.error(`Error while converting file ${jobId}`, e);
      this.converterService.emit('job_completed', {
        id: jobId,
        status: JobStatus.FAILED,
      });
    }
  }

  async downloadFile(jobId: string) {
    const data = await this.s3.listObjectsV2({
      Bucket: this.configService.get('S3_BUCKET'),
      Prefix: `input/${jobId}`,
    });

    if (data.Contents.length === 0) {
      throw new Error('File not found');
    }

    const objectInfo = data.Contents[0];
    const fileName = this.utils.getFileName(objectInfo.Key);

    const file = await this.s3.getObject({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: objectInfo.Key,
    });
    const buffer = Buffer.from(await file.Body.transformToByteArray());
    return { buffer, fileName };
  }

  async uploadFile(file: Buffer, jobId: string, fileName: string) {
    await this.s3.putObject({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: `output/${jobId}/${fileName}.pdf`,
      Body: file,
    });
  }

  async convertToPdf(file: Buffer) {
    const convertAsync = promisify(libre.convert);
    const pdfBuf = await convertAsync(file, '.pdf', undefined);
    return pdfBuf;
  }
}
