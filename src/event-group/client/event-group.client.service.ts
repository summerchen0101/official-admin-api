import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventGroupClientService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(code: string) {
    return this.prisma.eventGroup.findUnique({
      where: { code },
      include: {
        events: {
          where: { is_active: true },
          orderBy: { sort: 'asc' },
          select: {
            code: true,
            title: true,
            tab_img: true,
            tab_active_img: true,
          },
        },
      },
    });
  }
}
