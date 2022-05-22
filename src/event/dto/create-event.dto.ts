import { Prisma, EventType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class LevelAward {
  @IsInt()
  level: number;

  @IsInt()
  prize_id: number;

  @IsInt()
  count: number;
}
class LevelAwardGroup {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => LevelAward)
  @IsNotEmpty()
  levels: LevelAward[];
}

class GameRebate {
  @IsString()
  game: string;

  @IsInt()
  rebate: number;
}

export class CreateEventDto {
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

  @IsEnum(EventType)
  type: EventType;

  @ValidateNested()
  @Type(() => LevelAwardGroup)
  @IsNotEmpty()
  @ValidateIf((obj) => obj.type === EventType.LEVEL_PRIZE)
  groups: Prisma.JsonArray;

  @ValidateNested()
  @Type(() => GameRebate)
  @IsNotEmpty()
  @ValidateIf((obj) => obj.type === EventType.GAME_REBATE)
  rebates: Prisma.JsonArray;
}
