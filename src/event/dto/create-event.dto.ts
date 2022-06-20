import { EventType, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
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

class RechargePrize {
  @IsInt()
  amount: number;

  @IsInt()
  prize_id: number;

  @IsInt()
  count: number;
}

enum CustomColumnType {
  TEXT = 1,
  ICON = 2,
  TEXT_ICON = 3,
}

class CustomColumn {
  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsEnum(CustomColumnType)
  type: CustomColumnType;
}

class CustomTable {
  @IsString()
  title?: string;

  @ValidateNested()
  @Type(() => CustomColumn)
  @IsNotEmpty()
  columns: CustomColumn[];

  @IsObject({ each: true })
  rows: object[];
}

export class CreateEventDto {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  start_at?: string;

  @IsString()
  @IsOptional()
  end_at?: string;

  @IsBoolean()
  is_active: boolean;

  @IsInt()
  @IsOptional()
  sort?: number;

  @IsString()
  @IsOptional()
  tab_img: string;

  @IsString()
  @IsOptional()
  tab_active_img: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  target: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  event_group_ids?: string[];

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

  @ValidateNested()
  @Type(() => RechargePrize)
  @IsNotEmpty()
  @ValidateIf((obj) => obj.type === EventType.RECHARGE_PRIZE)
  recharges: Prisma.JsonArray;

  @ValidateNested()
  @Type(() => CustomTable)
  @IsNotEmpty()
  @ValidateIf((obj) => obj.type === EventType.CUSTOM_TABLE)
  custom_tables: Prisma.JsonArray;
}
