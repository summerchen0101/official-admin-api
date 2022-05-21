import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';
export class SearchOperationRecDto extends PaginateDto {
  @IsString()
  @IsOptional()
  controller?: string;

  @IsString()
  @IsOptional()
  handler?: string;

  @IsString()
  @IsOptional()
  operator_id?: string;

  @IsString()
  @IsOptional()
  target_id?: string;
}
