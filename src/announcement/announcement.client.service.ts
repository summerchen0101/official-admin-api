import { Injectable } from '@nestjs/common';
import { Platform, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientSearchAnnouncementsDto } from './dto/client-search-announcements.dto';

@Injectable()
export class AnnouncementClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search: ClientSearchAnnouncementsDto) {
    const { page = 1, perpage = 10, platform, type } = search;
    const findManyArgs: Prisma.AnnouncementFindManyArgs = {
      where: {
        is_active: true,
        platform: {
          in: [platform, Platform.ALL],
        },
        OR: [
          {
            start_at: {
              lte: new Date(),
            },
            end_at: {
              gte: new Date(),
            },
          },
          {
            start_at: {
              equals: null,
            },
            end_at: {
              gte: new Date(),
            },
          },
          {
            start_at: {
              lte: new Date(),
            },
            end_at: {
              equals: null,
            },
          },
          {
            start_at: {
              equals: null,
            },
            end_at: {
              equals: null,
            },
          },
        ],
        type: type || undefined,
      },
      orderBy: [{ is_top: 'desc' }, { sort: 'asc' }, { start_at: 'desc' }],
      take: +perpage,
      skip: (+page - 1) * +perpage,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.announcement.findMany(findManyArgs),
      this.prisma.announcement.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      paginator: {
        page,
        perpage,
        total,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.announcement.findUnique({ where: { id } });
  }
}
