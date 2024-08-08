import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class ConverterService {
  constructor(
    @Inject('CONVERTER_SERVICE') private readonly converterService: ClientProxy,
  ) {}

  async pingConverterService() {
    return this.converterService
      .send('ping_from_gateway', 'ping')
      .pipe(map((res: Response) => res));
  }

  async pingWorker() {
    return this.converterService.emit('ping_worker', '');
  }
}
