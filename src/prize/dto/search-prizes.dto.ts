import { PrizeType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/dto/paginate.dto';

export class SearchPrizesDto extends PaginateDto {
  @IsEnum(PrizeType)
  @IsOptional()
  type: PrizeType;
}
