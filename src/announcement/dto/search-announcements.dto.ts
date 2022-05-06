import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SearchAnnouncements {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  perpage?: number = 10;
}
