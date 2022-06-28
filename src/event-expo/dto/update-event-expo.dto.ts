import { PartialType } from '@nestjs/swagger';
import { CreateEventExpoDto } from './create-event-expo.dto';

export class UpdateEventExpoDto extends PartialType(CreateEventExpoDto) {}
