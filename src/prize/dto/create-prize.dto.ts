import { Prisma, PrizeType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreatePrizeDto implements Prisma.PrizeCreateInput {
  @IsEnum(PrizeType)
  type: PrizeType;

  @IsString()
  name: string;

  @IsString()
  img_path: string;
}
