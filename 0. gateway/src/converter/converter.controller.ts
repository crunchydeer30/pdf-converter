import { Controller, Get, Inject } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('converter')
export class ConverterController {
  constructor(
    private readonly converterService: ConverterService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('ping')
  async pingConverterMicroservice() {
    return this.converterService.pingConverterService();
  }

  @Get('ping-worker')
  async pingWorker() {
    // Make changes
    await this.converterService.pingWorker();
  }
}
