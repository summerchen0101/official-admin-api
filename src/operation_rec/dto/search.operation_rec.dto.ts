import { OperationRec, Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
export class SearchOperationRecDto implements Partial<OperationRec> {
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
