import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { SearchEventGroupsDto } from './dto/search-events-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';

@Injectable()
export class EventGroupService {
  constructor(private readonly prisma: PrismaService) {}
  create({ event_ids, ...data }: CreateEventGroupDto) {
    return this.prisma.eventGroup.create({
      data: {
        ...data,
        events: {
          connect: event_ids?.map((id) => ({ id })),
        },
      },
      include: { events: true },
    });
  }

  option() {
    return this.prisma.eventGroup.findMany({
      select: { id: true, name: true, code: true },
    });
  }

  async findAll(search: SearchEventGroupsDto) {
    const { page, perpage, name } = search;
    const findManyArgs: Prisma.EventGroupFindManyArgs = {
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        events: { select: { id: true, title: true, code: true } },
      },
      take: perpage,
      skip: (page - 1) * perpage,
    };
    const [items, count] = await this.prisma.$transaction([
      this.prisma.eventGroup.findMany(findManyArgs),
      this.prisma.eventGroup.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: string) {
    return this.prisma.eventGroup.findUnique({
      where: { id },
      include: {
        events: {
          select: {
            code: true,
            title: true,
          },
        },
      },
    });
  }

  update(id: string, { event_ids, ...data }: UpdateEventGroupDto) {
    return this.prisma.eventGroup.update({
      where: { id },
      data: {
        ...data,
        events: {
          set: event_ids?.map((id) => ({ id })),
        },
      },
      include: { events: true },
    });
  }

  remove(id: string) {
    return this.prisma.eventGroup.delete({ where: { id } });
  }
}
