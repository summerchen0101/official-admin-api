import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventClientService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(code: string) {
    return this.prisma.event.findUnique({
      where: { code },
      include: { event_group: { select: { code: true, name: true } } },
    });
  }
}
