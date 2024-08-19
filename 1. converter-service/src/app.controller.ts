import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';
import { Job } from './interfaces';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping_from_gateway')
  async pingFromGateway() {
    return { converter_service: 'PONG' };
  }

  @MessagePattern('ping_worker')
  async pingWorker() {
    await this.appService.pingWorker();
  }

  @MessagePattern('office_to_pdf')
  async pdfToOffice(@Payload() file: Express.Multer.File) {
    return await this.appService.officeToPdf(file);
  }

  @EventPattern('job_acknowledged')
  async jobAcknowledged(@Payload() jobId: string) {
    await this.appService.jobAcknowledged(jobId);
  }

  @EventPattern('job_completed')
  async jobCompleted(@Payload() job: Job) {
    await this.appService.jobCompleted(job);
  }
}
