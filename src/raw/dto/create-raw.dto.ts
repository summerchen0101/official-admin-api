import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRawDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  data: any;
}
