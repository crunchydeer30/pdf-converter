import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  Param,
  Sse,
  Body,
} from '@nestjs/common';
import { ConverterService } from './converter.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlloweMimesValidator } from './validators/allowed-mimes.validator';
import { OFFICE_MIMES } from './constants/office-mimes';
import { Throttle } from '@nestjs/throttler';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get('files/:jobId/download')
  async download(@Param() { jobId }: { jobId: string }) {
    return this.converterService.download(jobId);
  }

  @Get('files/:jobId/status')
  async getJobStatus(@Param() { jobId }: { jobId: string }) {
    return this.converterService.getJobStatus(jobId);
  }

  @Sse('files/:jobId/progress')
  getJobUpdates(@Param() { jobId }: { jobId: string }) {
    return this.converterService.getJobUpdates(jobId);
  }

  @Throttle({
    default: {
      ttl: 300000,
      limit: 20,
    },
  })
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
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf-8',
    );
    return this.converterService.officeToPdf(file);
  }

  @Throttle({
    default: {
      ttl: 300000,
      limit: 20,
    },
  })
  @Post('office-to-pdf-link')
  async officeToPdfLink(@Body() data: unknown) {
    return this.converterService.officeToPdfLink(data);
  }
}
