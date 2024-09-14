import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UtilsService } from 'src/utils/utils.service';
import { v4 as uuid } from 'uuid';
import { JobsService } from 'src/jobs/jobs.service';
import { MAX_FILE_SIZE, OFFICE_MIMES } from './constants/office-mimes';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';

@Injectable()
export class OfficeDocsService {
  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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
    await this.jobsService.uploadToS3(jobId, file.buffer, fileMeta);
    await this.jobsService.create(jobId);
    return { message: 'File uploaded', jobId, fileMeta };
  }

  async officeToPdfLink(url: string) {
    const jobId = uuid();
    const fileMeta = await this.validateLink(url);
    const buffer = await this.utils.downloadFileFromUrl(url);
    this.logger.info(`File received: ${fileMeta.fileName}`, {
      ...fileMeta,
      jobId,
    });
    await this.jobsService.uploadToS3(jobId, buffer, fileMeta);
    await this.jobsService.create(jobId);
    return { message: 'File uploaded', jobId, fileMeta };
  }

  async validateLink(url: string): Promise<FileMetadata> {
    const { fileType, fileName, fileSize } =
      await this.utils.fileMetadataFromUrl(url);

    if (!OFFICE_MIMES.includes(fileType))
      throw new BadRequestException(
        `Sorry, we are not able to convert ${path.extname(url)} file.`,
      );

    if (fileSize > MAX_FILE_SIZE) {
      throw new BadRequestException(`File is too big`);
    }

    return { fileName, fileType, fileSize };
  }
}
