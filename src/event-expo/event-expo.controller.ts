import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventExpoService } from './event-expo.service';
import { CreateEventExpoDto } from './dto/create-event-expo.dto';
import { UpdateEventExpoDto } from './dto/update-event-expo.dto';
import { SearchEventExposDto } from './dto/search-events-group.dto';

@Controller('event-expos')
export class EventExpoController {
  constructor(private readonly eventExpoService: EventExpoService) {}

  @Post()
  create(@Body() createEventExpoDto: CreateEventExpoDto) {
    return this.eventExpoService.create(createEventExpoDto);
  }

  @Get()
  findAll(@Query() query: SearchEventExposDto) {
    return this.eventExpoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventExpoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventExpoDto: UpdateEventExpoDto,
  ) {
    return this.eventExpoService.update(id, updateEventExpoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventExpoService.remove(id);
  }
}
