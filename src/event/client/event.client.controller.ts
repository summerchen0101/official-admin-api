import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/user/metas/public.meta';
import { EventClientService } from './event.client.service';

@Controller('public/events')
@Public()
export class EventClientController {
  constructor(private readonly eventService: EventClientService) {}

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.eventService.findOne(code);
  }
}
