import { IsOptional, IsString } from 'class-validator';
import { PaginateQuery } from 'src/dto/paginate-query.dto';

export class SearchAnnouncements extends PaginateQuery {
  @IsString()
  @IsOptional()
  keyword = '';
}
