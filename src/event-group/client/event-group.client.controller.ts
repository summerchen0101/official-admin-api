import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/user/metas/public.meta';
import { EventGroupClientService } from './event-group.client.service';

@Public()
@Controller('public/event-groups')
export class EventGroupClientController {
  constructor(private readonly eventGroupService: EventGroupClientService) {}

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.eventGroupService.findOne(code);
  }
}
