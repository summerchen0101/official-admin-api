import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(params: {
    page?: number;
    perpage?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { page, perpage, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip: page ? (page - 1) * perpage : undefined,
      take: perpage,
      cursor,
      where,
      orderBy,
    });
  }

  async create({ password, ...data }: Prisma.UserCreateInput): Promise<User> {
    const hash = await argon2.hash(password);
    return this.prisma.user.create({
      data: { ...data, password: hash },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
