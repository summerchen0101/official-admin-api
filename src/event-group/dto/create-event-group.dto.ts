import { Platform, Prisma } from '@prisma/client';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateEventGroupDto
  implements Partial<Prisma.EventGroupCreateInput>
{
  @IsString()
  @IsOptional()
  banner?: string;

  @IsString()
  @IsOptional()
  title_img?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsOptional()
  platform?: Platform;

  @IsString({ each: true })
  @IsOptional()
  event_ids?: string[];
}
