import { PartialType } from '@nestjs/swagger';
import { CreateEventSectionDto } from './create-event-section.dto';

export class UpdateEventSectionDto extends PartialType(CreateEventSectionDto) {}
