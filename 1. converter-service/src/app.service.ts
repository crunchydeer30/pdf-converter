import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONVERTER_WORKER') private readonly converterWorker: ClientProxy,
  ) {}

  async pingWorker() {
    this.converterWorker.emit('ping_from_service', {
      message: 'PING',
    });
  }
}
