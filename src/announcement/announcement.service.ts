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

  findAll({ page, perpage }: SearchAnnouncements) {
    return this.prisma.announcement.findMany({
      orderBy: [{ is_top: 'desc' }, { sort: 'asc' }],
      take: perpage,
      skip: (page - 1) * perpage,
    });
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
