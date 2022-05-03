import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto implements Prisma.CategoryUpdateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
