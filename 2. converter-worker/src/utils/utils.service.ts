import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class UtilsService {
  ack(ctx: RmqContext): void {
    const message = ctx.getMessage();
    const channel = ctx.getChannelRef();
    channel.ack(message);
  }
}
