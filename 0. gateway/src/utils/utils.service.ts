import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  MicroserviceException,
  microserviceExceptionSchema,
} from './schemas/microservice-exceptions.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UtilsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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
