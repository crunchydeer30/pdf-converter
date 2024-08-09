import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  LogData,
} from 'winston-elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_URL: Joi.string().required(),
        RMQ_CONVERTER_REQUEST_QUEUE: Joi.string().required(),
        RMQ_CONVERTER_RESPONSE_QUEUE: Joi.string().required(),
        ELASTICSEARCH_URL: Joi.string().required(),
        ELASTICSEARCH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_PASSWORD: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'CONVERTER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<RmqUrl>('RMQ_URL')],
            queue: configService.get('RMQ_CONVERTER_RESPONSE_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: 'info',
        defaultMeta: { service: 'converter-worker' },
        transports: [
          new winston.transports.Console({
            format: winston.format.cli(),
          }),
          new ElasticsearchTransport({
            level: 'debug',
            transformer: (logData: LogData) =>
              ElasticsearchTransformer(logData),
            clientOpts: {
              node: configService.get('ELASTICSEARCH_URL'),
              auth: {
                username: configService.get('ELASTICSEARCH_USERNAME'),
                password: configService.get('ELASTICSEARCH_PASSWORD'),
              },
            },
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
