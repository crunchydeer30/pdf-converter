import {
  Controller,
  Get,
  Post,
  Inject,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { ConverterService } from './converter.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlloweMimesValidator } from './validators/allowed-mimes.validator';
import { OFFICE_MIMES } from './constants/office-mimes';

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

  @Post('office-to-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async officeToPdf(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 50 }),
          new AlloweMimesValidator({ fileTypes: OFFICE_MIMES }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.converterService.officeToPdf(file);
  }
}
