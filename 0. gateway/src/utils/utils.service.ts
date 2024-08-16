import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  MicroserviceException,
  microserviceExceptionSchema,
} from './schemas/microservice-exceptions.schema';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UtilsService {
  constructor(private readonly logger: PinoLogger) {}

  async handleMicroserviceError(error: unknown) {
    const e = await this.parseMicroserviceException(error);
    throw new HttpException(e.response, e.status);
  }

  async parseMicroserviceException(
    error: unknown,
  ): Promise<MicroserviceException> {
    try {
      return await microserviceExceptionSchema.parseAsync(error);
    } catch {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
