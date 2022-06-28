import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventExpoClientService {
  constructor(private readonly prisma: PrismaService) {}
  findOne(code: string) {
    return this.prisma.eventExpo.findUnique({
      where: { code },
      include: {
        event_groups: {
          select: {
            code: true,
            name: true,
            platform: true,
          },
        },
      },
    });
  }
}
