import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RedisModule } from '@nestjs-modules/ioredis';
import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  LogData,
} from 'winston-elasticsearch';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RMQ_URL: Joi.string().required(),
        RMQ_CONVERTER_RESPONSE_QUEUE: Joi.string().required(),
        ELASTICSEARCH_URL: Joi.string().required(),
        ELASTICSEARCH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_PASSWORD: Joi.string().required(),
        S3_ACCESS_KEY_ID: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_ENDPOINT: Joi.string().required(),
        S3_REGION: Joi.string().required(),
        S3_BUCKET: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
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
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: 'info',
        defaultMeta: { service: 'converter-service' },
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
    S3Module.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
          },
          endpoint: configService.get('S3_ENDPOINT'),
          region: configService.get('S3_REGION'),
        },
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
