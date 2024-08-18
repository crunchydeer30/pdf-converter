import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { FileMetadata } from 'src/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UtilsService {
  getFileName(file: Express.Multer.File): string {
    return path.parse(file.originalname).name;
  }

  collectFileMetadata(file: Express.Multer.File): FileMetadata {
    return {
      file_id: uuid(),
      file_name: this.getFileName(file),
      file_size: file.size,
      file_type: file.mimetype,
    };
  }
}
