import { Event, Prisma } from '@prisma/client';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateEventDto implements Partial<Prisma.EventCreateInput> {
  @IsString()
  code: string;

  @IsISO8601()
  @IsOptional()
  start_at?: Date;

  @IsISO8601()
  @IsOptional()
  end_at?: Date;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  type: 'NORMAL';

  @IsInt()
  @IsOptional()
  sort?: number;

  @IsString()
  @IsOptional()
  banner: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  event_group_id: string;
}
