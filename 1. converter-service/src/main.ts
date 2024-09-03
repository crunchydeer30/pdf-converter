import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('HOST'),
        port: configService.get('PORT'),
      },
    },
    { inheritAppConfig: true },
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<RmqUrl>('RMQ_URL')],
      queue: configService.get('RMQ_CONVERTER_RESPONSE_QUEUE'),
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
