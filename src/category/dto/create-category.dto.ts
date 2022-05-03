import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
