import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventExpoDto } from './dto/create-event-expo.dto';
import { SearchEventExposDto } from './dto/search-events-group.dto';
import { UpdateEventExpoDto } from './dto/update-event-expo.dto';

@Injectable()
export class EventExpoService {
  constructor(private readonly prisma: PrismaService) {}
  create({ event_group_ids, ...data }: CreateEventExpoDto) {
    return this.prisma.eventExpo.create({
      data: {
        ...data,
        event_groups: {
          connect: event_group_ids?.map((id) => ({ id })),
        },
      },
      include: { event_groups: true },
    });
  }

  async findAll(search: SearchEventExposDto) {
    const { page, perpage, code, event_group_id } = search;
    const findManyArgs: Prisma.EventExpoFindManyArgs = {
      where: {
        code,
        event_groups: {
          some: { id: event_group_id },
        },
      },
      include: {
        event_groups: { select: { id: true, name: true, code: true } },
      },
      take: perpage,
      skip: (page - 1) * perpage,
    };
    const [items, count] = await this.prisma.$transaction([
      this.prisma.eventExpo.findMany(findManyArgs),
      this.prisma.eventExpo.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: string) {
    return this.prisma.eventExpo.findUnique({
      where: { id },
      include: {
        event_groups: true,
      },
    });
  }

  update(id: string, { event_group_ids, ...data }: UpdateEventExpoDto) {
    return this.prisma.eventExpo.update({
      where: { id },
      data: {
        ...data,
        event_groups: {
          set: event_group_ids?.map((id) => ({ id })),
        },
      },
      include: { event_groups: true },
    });
  }

  remove(id: string) {
    return this.prisma.eventExpo.delete({ where: { id } });
  }
}
