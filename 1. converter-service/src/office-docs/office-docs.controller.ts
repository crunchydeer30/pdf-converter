import { Controller, UseFilters } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { HttpExceptionFilter } from 'src/filters/http-exceptions.filter';
import { Job } from '../interfaces';
import { OfficeDocsService } from './office-docs.service';
import { UtilsService } from 'src/utils/utils.service';

@UseFilters(HttpExceptionFilter)
@Controller('office-docs')
export class OfficeDocsController {
  constructor(
    private readonly officeDocsService: OfficeDocsService,
    private readonly utils: UtilsService,
  ) {}

  @MessagePattern('ping_from_gateway')
  async pingFromGateway() {
    return { converter_service: 'PONG' };
  }

  @MessagePattern('job_status')
  async getJobStatus(@Payload() jobId: string) {
    return await this.officeDocsService.getJobStatus(jobId);
  }

  @MessagePattern('job_progress')
  async sendJobStatusUpdates(@Payload() jobId: string) {
    return await this.officeDocsService.sendJobStatusUpdates(jobId);
  }

  @MessagePattern('office_to_pdf')
  async pdfToOffice(@Payload() file: Express.Multer.File) {
    return await this.officeDocsService.officeToPdf(file);
  }

  @MessagePattern('download')
  async download(@Payload() jobId: string) {
    console.log(jobId);
    return await this.officeDocsService.download(jobId);
  }

  @EventPattern('job_acknowledged')
  async jobAcknowledged(@Payload() jobId: string, @Ctx() context: RmqContext) {
    this.utils.ack(context);
    await this.officeDocsService.jobAcknowledged(jobId);
  }

  @EventPattern('job_completed')
  async jobCompleted(@Payload() job: Job, @Ctx() context: RmqContext) {
    this.utils.ack(context);
    await this.officeDocsService.jobCompleted(job);
  }
}
