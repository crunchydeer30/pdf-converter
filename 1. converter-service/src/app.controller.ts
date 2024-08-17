import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ack } from './utils';
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
    try {
      await this.appService.officeToPdf(file);
      return { message: 'File uploaded' };
    } catch (e) {}
  }

  @EventPattern('ping_from_worker')
  async pingFromWorker(
    @Payload() message: { message: string },
    @Ctx() ctx: RmqContext,
  ) {
    ack(ctx);
    console.log('Message from worker: ', message);
  }
}
