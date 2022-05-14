import { Injectable } from '@nestjs/common';
import { Platform, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { SearchAnnouncementsDto } from './dto/search-announcements.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateAnnouncementDto) {
    return this.prisma.announcement.create({ data });
  }

  async findAll(search: SearchAnnouncementsDto) {
    const { page, perpage, keyword, platform, type, is_active } = search;
    const findManyArgs: Prisma.AnnouncementFindManyArgs = {
      where: {
        is_active: { 0: undefined, 1: true, 2: false }[is_active],
        AND: [
          {
            OR: platform
              ? [
                  { platform: Platform.ALL },
                  {
                    platform: platform || undefined,
                  },
                ]
              : [],
          },
          {
            type: type || undefined,
          },
          {
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          },
        ],
      },
      orderBy: [{ is_top: 'desc' }, { sort: 'asc' }],
      take: perpage,
      skip: (page - 1) * perpage,
    };

    const [items, count] = await this.prisma.$transaction([
      this.prisma.announcement.findMany(findManyArgs),
      this.prisma.announcement.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: string) {
    return this.prisma.announcement.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateAnnouncementDto) {
    return this.prisma.announcement.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
