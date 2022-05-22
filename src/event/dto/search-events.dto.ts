import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchEventsDto extends PaginateDto {
  @IsString()
  @IsOptional()
  keyword?: string = '';

  @IsString()
  @IsOptional()
  type = null;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => +value)
  is_active?: number = 0;
}
