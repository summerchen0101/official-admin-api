import { ApiProperty } from '@nestjs/swagger';
import { AnnouncementType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsEnum(AnnouncementType)
  @ApiProperty({ enum: AnnouncementType })
  type: AnnouncementType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '測試標題' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '測試內容' })
  content: string;

  @ApiProperty()
  @IsDateString()
  start_at: Date;

  @ApiProperty()
  @IsDateString()
  end_at: Date;
}
