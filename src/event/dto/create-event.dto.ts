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

class RechargePrize {
  @IsInt()
  amount: number;

  @IsInt()
  prize_id: number;

  @IsInt()
  count: number;
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

  @ValidateNested()
  @Type(() => RechargePrize)
  @IsNotEmpty()
  @ValidateIf((obj) => obj.type === EventType.RECHARGE_PRIZE)
  recharges: Prisma.JsonArray;
}
