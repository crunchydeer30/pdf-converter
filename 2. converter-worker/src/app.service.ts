import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONVERTER_SERVICE') private readonly converterService: ClientProxy,
  ) {}

  async pingService() {
    this.converterService.emit('ping_from_worker', {
      message: 'PING',
    });
  }
}
