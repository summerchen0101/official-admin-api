import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { SearchAnnouncements } from './dto/search-announcements.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateAnnouncementDto) {
    return this.prisma.announcement.create({ data });
  }

  async findAll(search: SearchAnnouncements) {
    const { page, perpage, keyword } = search;
    const findManyArgs: Prisma.AnnouncementFindManyArgs = {
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      },
      orderBy: [{ is_top: 'desc' }, { sort: 'asc' }],
      take: perpage,
      skip: (page - 1) * perpage,
    };

    const [items, count_all, count_is_active, count_is_top] =
      await this.prisma.$transaction([
        this.prisma.announcement.findMany(findManyArgs),
        this.prisma.announcement.count({ where: findManyArgs.where }),
        this.prisma.announcement.count({
          where: { ...findManyArgs.where, is_active: true },
        }),
        this.prisma.announcement.count({
          where: { ...findManyArgs.where, is_top: true },
        }),
      ]);

    return {
      items,
      counts: {
        all: count_all,
        is_active: count_is_active,
        is_top: count_is_top,
      },
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
