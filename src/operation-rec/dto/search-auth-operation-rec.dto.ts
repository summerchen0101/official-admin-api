import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';
export class SearchAuthOperationRecDto extends PaginateDto {
  @IsString()
  @IsOptional()
  operator_id?: string;
}
