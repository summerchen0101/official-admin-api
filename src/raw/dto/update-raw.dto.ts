import { PartialType } from '@nestjs/swagger';
import { CreateRawDto } from './create-raw.dto';

export class UpdateRawDto extends PartialType(CreateRawDto) {}
