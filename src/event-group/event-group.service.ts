import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';

@Injectable()
export class EventGroupService {
  constructor(private readonly prisma: PrismaService) {}
  create({ event_ids, ...data }: CreateEventGroupDto) {
    return this.prisma.eventGroup.create({
      data: {
        ...data,
        events: {
          connect: event_ids.map((id) => ({ id })),
        },
      },
      include: { events: true },
    });
  }

  findAll() {
    return this.prisma.eventGroup.findMany({ include: { events: true } });
  }

  findOne(id: string) {
    return this.prisma.eventGroup.findUnique({ where: { id } });
  }

  update(id: string, { event_ids, ...data }: UpdateEventGroupDto) {
    return this.prisma.eventGroup.update({
      where: { id },
      data: {
        ...data,
        events: {
          connect: event_ids.map((id) => ({ id })),
        },
      },
      include: { events: true },
    });
  }

  remove(id: string) {
    return this.prisma.eventGroup.delete({ where: { id } });
  }
}
