import { Controller, Get } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get('ping')
  async pingConverterMicroservice() {
    return this.converterService.pingConverterService();
  }

  @Get('ping-worker')
  async pingWorker() {
    await this.converterService.pingWorker();
  }
}
