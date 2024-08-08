import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RMQ_URL: Joi.string().required(),
        RMQ_CONVERTER_RESPONSE_QUEUE: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'CONVERTER_WORKER',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<RmqUrl>('RMQ_URL')],
            queue: configService.get('RMQ_CONVERTER_REQUEST_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
