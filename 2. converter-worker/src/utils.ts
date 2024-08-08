import { RmqContext } from '@nestjs/microservices';

export function ack(ctx: RmqContext): void {
  const message = ctx.getMessage();
  const channel = ctx.getChannelRef();
  channel.ack(message);
}
