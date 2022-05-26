import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchEventGroupsDto extends PaginateDto {
  @IsString()
  @IsOptional()
  name?: string;
}
