import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, filter, map } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ConverterService {
  constructor(
    @Inject('CONVERTER_SERVICE') private readonly converterService: ClientProxy,
    private readonly utils: UtilsService,
  ) {}
  async getJobStatus(jobId: string) {
    return this.converterService
      .send('jobs:status', jobId)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async getJobUpdates(jobId: string) {
    return this.converterService.send('jobs:progress', jobId).pipe(
      filter((data) => {
        if (data && 'jobId' in data) {
          return data.jobId === jobId;
        }
        return false;
      }),
      map((data) => ({ data })),
      catchError(async (e) => this.utils.handleMicroserviceError(e)),
    );
  }

  async download(jobId: string) {
    return this.converterService
      .send('jobs:download', jobId)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async officeToPdf(file: Express.Multer.File) {
    return this.converterService
      .send('office:to_pdf', file)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async officeToPdfLink(body: unknown) {
    return this.converterService
      .send('office:to_pdf_link', body)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }
}
