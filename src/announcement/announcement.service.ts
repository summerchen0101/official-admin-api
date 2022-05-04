import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateAnnouncementDto) {
    return this.prisma.announcement.create({ data });
  }

  findAll(where?: Prisma.AnnouncementWhereInput) {
    return this.prisma.announcement.findMany({ where });
  }

  findOne(id: number) {
    return this.prisma.announcement.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateAnnouncementDto) {
    return this.prisma.announcement.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
