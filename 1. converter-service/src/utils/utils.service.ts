import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';

@Injectable()
export class UtilsService {
  collectFileMetadata(file: Express.Multer.File): FileMetadata {
    return {
      fileName: path.basename(file.originalname),
      fileSize: file.size,
      fileType: file.mimetype,
    };
  }
}
