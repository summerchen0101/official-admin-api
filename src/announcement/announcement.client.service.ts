import { Injectable } from '@nestjs/common';
import { AnnouncementType, Platform, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search: {
    page: number;
    perpage: number;
    platform: Platform;
    type: AnnouncementType;
  }) {
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
        type,
      },
      orderBy: [{ is_top: 'desc' }, { sort: 'asc' }],
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
