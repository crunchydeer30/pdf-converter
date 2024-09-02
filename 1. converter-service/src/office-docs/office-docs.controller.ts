import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OfficeDocsService } from './office-docs.service';

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
}
