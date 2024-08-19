import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  LogData,
} from 'winston-elasticsearch';
import { OfficeDocsModule } from './office-docs/office-docs.module';
import { S3Module } from 'nestjs-s3';

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
        S3_ACCESS_KEY_ID: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_BUCKET: Joi.string().required(),
        S3_ENDPOINT: Joi.string().required(),
        S3_REGION: Joi.string().required(),
      }),
    }),
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
    OfficeDocsModule,
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
  ],
})
export class AppModule {}
