import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

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

  @EventPattern('job_accepted')
  async jobAccepted(@Payload() fileId: string) {
    await this.appService.jobAccepted(fileId);
  }
}
