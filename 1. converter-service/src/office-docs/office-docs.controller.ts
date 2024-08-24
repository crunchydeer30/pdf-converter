import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { HttpExceptionFilter } from 'src/filters/http-exceptions.filter';
import { Job } from '../interfaces';
import { OfficeDocsService } from './office-docs.service';

@UseFilters(HttpExceptionFilter)
@Controller('office-docs')
export class OfficeDocsController {
  constructor(private readonly officeDocsService: OfficeDocsService) {}

  @MessagePattern('ping_from_gateway')
  async pingFromGateway() {
    return { converter_service: 'PONG' };
  }

  @MessagePattern('ping_worker')
  async pingWorker() {
    await this.officeDocsService.pingWorker();
  }

  @MessagePattern('office_to_pdf')
  async pdfToOffice(@Payload() file: Express.Multer.File) {
    return await this.officeDocsService.officeToPdf(file);
  }

  @EventPattern('job_acknowledged')
  async jobAcknowledged(@Payload() jobId: string) {
    await this.officeDocsService.jobAcknowledged(jobId);
  }

  @EventPattern('job_completed')
  async jobCompleted(@Payload() job: Job) {
    await this.officeDocsService.jobCompleted(job);
  }
}
