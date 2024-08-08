import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConverterModule } from './converter/converter.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(8000),
        CONVERTER_HOST: Joi.string(),
        CONVERTER_PORT: Joi.number(),
      }),
    }),
    ConverterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
