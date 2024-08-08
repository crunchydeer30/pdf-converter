import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { ack } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('ping_from_service')
  async pingFromService(
    @Payload() message: { message: string },
    @Ctx() ctx: RmqContext,
  ) {
    ack(ctx);
    console.log('Message from service: ', message);
    await this.appService.pingService();
  }
}
