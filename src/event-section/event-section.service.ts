import { Injectable } from '@nestjs/common';
import { CreateEventSectionDto } from './dto/create-event-section.dto';
import { UpdateEventSectionDto } from './dto/update-event-section.dto';

@Injectable()
export class EventSectionService {
  create(createEventSectionDto: CreateEventSectionDto) {
    return 'This action adds a new eventSection';
  }

  findAll() {
    return `This action returns all eventSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventSection`;
  }

  update(id: number, updateEventSectionDto: UpdateEventSectionDto) {
    return `This action updates a #${id} eventSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventSection`;
  }
}
