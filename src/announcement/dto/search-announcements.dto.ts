import { AnnouncementType, Platform } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchAnnouncements extends PaginateDto {
  @IsString()
  @IsOptional()
  keyword = '';

  @IsEnum(Platform)
  @IsOptional()
  @Transform(({ value }) => (value === Platform.ALL ? null : value))
  platform = null;

  @IsEnum(AnnouncementType)
  @IsOptional()
  type = null;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => +value)
  is_active = 0;
}
