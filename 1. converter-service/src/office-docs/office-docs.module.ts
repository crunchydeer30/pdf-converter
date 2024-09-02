import { Module } from '@nestjs/common';
import { OfficeDocsController } from './office-docs.controller';
import { OfficeDocsService } from './office-docs.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

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
  controllers: [OfficeDocsController],
  providers: [OfficeDocsService],
})
export class OfficeDocsModule {}
