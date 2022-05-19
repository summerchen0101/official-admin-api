import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventsDto } from './dto/search-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateEventDto) {
    return this.prisma.event.create({
      data,
    });
  }

  async findAll(search: SearchEventsDto) {
    const { page, perpage, keyword, type, is_active } = search;
    const findManyArgs: Prisma.EventFindManyArgs = {
      take: perpage,
      skip: (page - 1) * perpage,
    };
    const [items, count] = await this.prisma.$transaction([
      this.prisma.event.findMany(findManyArgs),
      this.prisma.event.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateEventDto) {
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
