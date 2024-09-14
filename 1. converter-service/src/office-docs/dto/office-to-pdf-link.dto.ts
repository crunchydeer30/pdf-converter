import { IsString, IsUrl } from 'class-validator';

export class OfficeToPdfLinkDto {
  @IsString()
  @IsUrl()
  url!: string;
}
