import { PartialType } from '@nestjs/swagger';
import { CreateOperationRecDto } from './create-operation_rec.dto';

export class UpdateOperationRecDto extends PartialType(CreateOperationRecDto) {}
