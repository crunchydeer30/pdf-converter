import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<RmqUrl>('RMQ_URL')],
      queue: configService.get('RMQ_CONVERTER_REQUEST_QUEUE'),
      queueOptions: {
        durable: true,
      },
      noAck: false,
      persistent: true,
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
