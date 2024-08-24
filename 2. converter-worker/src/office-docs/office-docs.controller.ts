import { Controller } from '@nestjs/common';
import { EventPattern, Ctx, RmqContext, Payload } from '@nestjs/microservices';
import { UtilsService } from 'src/utils/utils.service';
import { OfficeDocsService } from './office-docs.service';

@Controller('office-docs')
export class OfficeDocsController {
  constructor(
    private readonly officeDocsService: OfficeDocsService,
    private readonly utils: UtilsService,
  ) {}

  @EventPattern('office_to_pdf')
  async officeToPdf(@Payload() fileId: string, @Ctx() context: RmqContext) {
    this.utils.ack(context);
    await this.officeDocsService.officeToPdf(fileId);
  }
}
