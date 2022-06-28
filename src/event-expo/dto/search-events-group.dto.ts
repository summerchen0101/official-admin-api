import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchEventExposDto extends PaginateDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  event_group_id?: string;
}
