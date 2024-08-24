import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';
import { RmqContext } from '@nestjs/microservices';

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
}
