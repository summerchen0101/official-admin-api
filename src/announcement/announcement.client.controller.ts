import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Public } from 'src/user/metas/public.meta';
import { AnnouncementClientService } from './announcement.client.service';
import { ClientSearchAnnouncementsDto } from './dto/client-search-announcements.dto';

@ApiBearerAuth()
@Controller('public/announcements')
@Public()
export class AnnouncementClientController {
  constructor(private readonly service: AnnouncementClientService) {}

  @Get()
  async findAll(
    @Query()
    query: ClientSearchAnnouncementsDto,
  ) {
    try {
      return await this.service.findAll(query);
    } catch (err) {
      // if (err instanceof PrismaClientKnownRequestError) {
      //   console.log('prisma knows');
      // }
      // console.dir(err.message);
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
