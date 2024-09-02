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

  async pingConverterService() {
    return this.converterService
      .send('ping_from_gateway', 'ping')
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async getJobStatus(jobId: string) {
    return this.converterService
      .send('job_status', jobId)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async getJobUpdates(jobId: string) {
    return this.converterService.send('job_progress', jobId).pipe(
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
      .send('download', jobId)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }

  async officeToPdf(file: Express.Multer.File) {
    return this.converterService
      .send('office_to_pdf', file)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }
}
