import { Module } from '@nestjs/common';
import { OfficeDocsService } from './office-docs.service';
import { OfficeDocsController } from './office-docs.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

@Module({
  imports: [
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
  ],
  providers: [OfficeDocsService],
  controllers: [OfficeDocsController],
})
export class OfficeDocsModule {}
