import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { RedisModule } from '@nestjs-modules/ioredis';
import { S3Module } from 'nestjs-s3';
import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  LogData,
} from 'winston-elasticsearch';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ELASTICSEARCH_URL: Joi.string().uri().required(),
        ELASTICSEARCH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_PASSWORD: Joi.string().required(),
        CONVERTER_S3_ACCESS_KEY_ID: Joi.string().required(),
        CONVERTER_S3_SECRET_ACCESS_KEY: Joi.string().required(),
        CONVERTER_S3_ENDPOINT: Joi.string().required(),
        CONVERTER_S3_REGION: Joi.string().required(),
        CONVERTER_S3_BUCKET: Joi.string().required(),
        CONVERTER_REDIS_URL: Joi.string().required(),
      }),
    }),
    S3Module.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('CONVERTER_S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get(
              'CONVERTER_S3_SECRET_ACCESS_KEY',
            ),
          },
          endpoint: configService.get('CONVERTER_S3_ENDPOINT'),
          region: configService.get('CONVERTER_S3_REGION'),
        },
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get('CONVERTER_REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: 'info',
        defaultMeta: { service: 'cron-converter' },
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
  providers: [ConverterService],
})
export class ConverterModule {}
