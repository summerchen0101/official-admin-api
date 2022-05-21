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
import { EventGroupService } from './event-group.service';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';
import { SearchEventGroupsDto } from './dto/search-events-group.dto';

@Controller('event-groups')
export class EventGroupController {
  constructor(private readonly eventGroupService: EventGroupService) {}

  @Post()
  create(@Body() createEventGroupDto: CreateEventGroupDto) {
    return this.eventGroupService.create(createEventGroupDto);
  }

  @Get()
  findAll(@Query() query: SearchEventGroupsDto) {
    return this.eventGroupService.findAll(query);
  }

  @Get('option')
  option() {
    return this.eventGroupService.option();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventGroupService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventGroupDto: UpdateEventGroupDto,
  ) {
    return this.eventGroupService.update(id, updateEventGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventGroupService.remove(id);
  }
}
