import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { basename, parse } from 'path';

@Injectable()
export class UtilsService {
  ack(ctx: RmqContext): void {
    const message = ctx.getMessage();
    const channel = ctx.getChannelRef();
    channel.ack(message);
  }

  getFileName(s3objectInfo: string) {
    return parse(basename(s3objectInfo)).name;
  }
}
