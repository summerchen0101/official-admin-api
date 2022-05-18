import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventSectionService } from './event-section.service';
import { CreateEventSectionDto } from './dto/create-event-section.dto';
import { UpdateEventSectionDto } from './dto/update-event-section.dto';

@Controller('event-section')
export class EventSectionController {
  constructor(private readonly eventSectionService: EventSectionService) {}

  @Post()
  create(@Body() createEventSectionDto: CreateEventSectionDto) {
    return this.eventSectionService.create(createEventSectionDto);
  }

  @Get()
  findAll() {
    return this.eventSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventSectionDto: UpdateEventSectionDto) {
    return this.eventSectionService.update(+id, updateEventSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventSectionService.remove(+id);
  }
}
