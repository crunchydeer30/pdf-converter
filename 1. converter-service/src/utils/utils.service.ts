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

  async contentTypeFromUrl(url: string) {
    try {
      const response = await axios.head(url);
      return response['content-type'];
    } catch (error) {
      if (error.response.status === 404) {
        throw new BadRequestException(`Unable to access remote file: ${url}`);
      }
    }
  }
}
