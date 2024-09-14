import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OfficeDocsService } from './office-docs.service';
import { OfficeToPdfLinkDto } from './dto/office-to-pdf-link.dto';

@Controller('office-docs')
export class OfficeDocsController {
  constructor(private readonly officeDocsService: OfficeDocsService) {}

  @MessagePattern('ping_from_gateway')
  async pingFromGateway() {
    return { converter_service: 'PONG' };
  }

  @MessagePattern('office:to_pdf')
  async pdfToOffice(@Payload() file: Express.Multer.File) {
    return await this.officeDocsService.officeToPdf(file);
  }

  @MessagePattern('office:to_pdf_link')
  async pdfToOfficeLink(
    @Payload(new ValidationPipe({ transform: true, whitelist: true }))
    payload: OfficeToPdfLinkDto,
  ) {
    return await this.officeDocsService.officeToPdfLink(payload.url);
  }
}
