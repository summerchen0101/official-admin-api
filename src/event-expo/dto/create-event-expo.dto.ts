import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventExpoDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString({ each: true })
  @IsOptional()
  event_group_ids?: string[];
}
