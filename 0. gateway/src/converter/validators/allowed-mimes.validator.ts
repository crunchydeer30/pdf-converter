import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export type AlloweMimesOptions = {
  fileTypes: string[];
};

export class AlloweMimesValidator extends FileValidator<
  AlloweMimesOptions,
  IFile
> {
  isValid(file?: IFile): boolean | Promise<boolean> {
    if (file && this.validationOptions.fileTypes.includes(file.mimetype)) {
      return true;
    }
    return false;
  }

  buildErrorMessage(): string {
    return `Invalid file type`;
  }
}
