import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchAnnouncements extends PaginateDto {
  @IsString()
  @IsOptional()
  keyword = '';
}
