import { EventType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchEventsDto extends PaginateDto {
  @IsString()
  @IsOptional()
  event_group_id?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => +value)
  is_active?: number = 0;
}
