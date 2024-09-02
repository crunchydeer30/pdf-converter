import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
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
  providers: [JobsService],
  exports: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}
