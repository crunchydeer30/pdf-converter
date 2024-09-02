import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UtilsService } from 'src/utils/utils.service';
import { v4 as uuid } from 'uuid';
import { JobsService } from 'src/jobs/jobs.service';

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
    await this.jobsService.uploadToS3(jobId, file, fileMeta);
    await this.jobsService.create(jobId);
    return { message: 'File uploaded', jobId };
  }
}
