import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
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

  async pingWorker() {
    return this.converterService.emit('ping_worker', '');
  }

  async officeToPdf(file: Express.Multer.File) {
    return this.converterService
      .send('office_to_pdf', file)
      .pipe(catchError(async (e) => this.utils.handleMicroserviceError(e)));
  }
}
