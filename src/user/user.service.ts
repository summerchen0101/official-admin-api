import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
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

  async createUser({
    password,
    ...data
  }: Prisma.UserCreateInput): Promise<User> {
    const hash = await argon2.hash(password);
    return this.prisma.user.create({
      data: { ...data, password: hash },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
