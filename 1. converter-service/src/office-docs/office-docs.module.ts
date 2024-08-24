import { Module } from '@nestjs/common';
import { OfficeDocsController } from './office-docs.controller';
import { OfficeDocsService } from './office-docs.service';

@Module({
  controllers: [OfficeDocsController],
  providers: [OfficeDocsService]
})
export class OfficeDocsModule {}
