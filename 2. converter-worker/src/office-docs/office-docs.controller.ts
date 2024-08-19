import { Controller } from '@nestjs/common';
import { EventPattern, Ctx, RmqContext, Payload } from '@nestjs/microservices';
import { ack } from 'src/utils';
import { OfficeDocsService } from './office-docs.service';

@Controller('office-docs')
export class OfficeDocsController {
  constructor(private readonly officeDocsService: OfficeDocsService) {}

  @EventPattern('office_to_pdf')
  async officeToPdf(@Payload() fileId: string, @Ctx() context: RmqContext) {
    await this.officeDocsService.officeToPdf(fileId);
    ack(context);
  }
}
