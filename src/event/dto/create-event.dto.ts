import { Event, Prisma } from '@prisma/client';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsInt,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

interface LevelAward {
  level: number;
  award: string;
  count: number;
  icon: string;
}
interface LevelAwardGroup {
  title: string;
  levels: LevelAward[];
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  complex: LevelAwardGroup[];
}
