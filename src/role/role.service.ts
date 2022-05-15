import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data, include: { permissions: true } });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: string, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({
      where: { id },
      data,
      include: { permissions: true },
    });
  }

  remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }
}
