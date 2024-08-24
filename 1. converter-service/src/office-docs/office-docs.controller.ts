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

  @MessagePattern('office_to_pdf')
  async pdfToOffice(@Payload() file: Express.Multer.File) {
    return await this.officeDocsService.officeToPdf(file);
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
