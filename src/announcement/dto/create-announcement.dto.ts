import { AnnouncementType } from '@prisma/client';
import { IsEnum, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsEnum(AnnouncementType)
  type: AnnouncementType;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsMilitaryTime()
  start_at: string;

  @IsMilitaryTime()
  end_at: string;
}
