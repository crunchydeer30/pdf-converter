import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';
import { RmqContext } from '@nestjs/microservices';
import axios, { AxiosError } from 'axios';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UtilsService {
  private fileTypeFromBuffer;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    (async () => {
      const fileType = await (eval(`import('file-type')`) as Promise<any>);
      this.fileTypeFromBuffer = fileType.fileTypeFromBuffer;
    })();
  }

  collectFileMetadata(file: Express.Multer.File): FileMetadata {
    return {
      fileName: Buffer.from(
        path.basename(file.originalname, 'latin1'),
      ).toString('utf-8'),
      fileSize: file.size,
      fileType: file.mimetype,
    };
  }

  ack(ctx: RmqContext): void {
    const message = ctx.getMessage();
    const channel = ctx.getChannelRef();
    channel.ack(message);
  }

  async fileMetadataFromUrl(url: string): Promise<FileMetadata> {
    try {
      const headers = (await axios.head(url)).headers;
      let fileType = headers['content-type'];
      const fileSize = headers['content-length'];

      if (fileType === 'application/octet-stream') {
        const res = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            Range: 'bytes=0-1023',
          },
        });
        fileType = (await this.fileTypeFromBuffer(res.data)).mime;
      }
      const fileName = path.basename(url);

      return {
        fileName,
        fileType,
        fileSize,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response.status === 404) {
          throw new BadRequestException(`Unable to access remote file: ${url}`);
        }
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async downloadFileFromUrl(url: string) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (error: unknown) {
      this.logger.error(`Unable to download file ${url}`, url);
      throw new InternalServerErrorException('Unable to download file');
    }
  }
}
