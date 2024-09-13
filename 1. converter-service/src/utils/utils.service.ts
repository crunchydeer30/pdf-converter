import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';
import { RmqContext } from '@nestjs/microservices';
import axios from 'axios';

@Injectable()
export class UtilsService {
  collectFileMetadata(file: Express.Multer.File): FileMetadata {
    return {
      fileName: path.basename(file.originalname),
      fileSize: file.size,
      fileType: file.mimetype,
    };
  }

  ack(ctx: RmqContext): void {
    const message = ctx.getMessage();
    const channel = ctx.getChannelRef();
    channel.ack(message);
  }

  async fileInfoFromUrl(url: string) {
    try {
      const response = await axios.head(url);
      const contentType = response.headers['content-type'];
      const contentLength = response.headers['content-length'];
      return {
        contentType,
        contentLength,
      };
    } catch (error) {
      if (error.response.status === 404) {
        throw new BadRequestException(`Unable to access remote file: ${url}`);
      }
    }
  }
}
