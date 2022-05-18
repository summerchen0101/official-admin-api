import { Prisma, PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PermissionService } from './permission/permission.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async seed() {
    try {
      const user = await this.prisma.user.upsert({
        where: { email: 'sp@admin.com' },
        update: {},
        create: {
          email: 'sp@admin.com',
          name: '超級管理員',
          password: await argon2.hash(
            this.configService.get('DEFAULT_PASSWORD'),
          ),
          role: {
            connectOrCreate: {
              where: { code: 'MASTER' },
              create: {
                name: '總管理員',
                code: 'MASTER',
              },
            },
          },
        },
      });
      const permissions = await this.prisma.permission.createMany({
        data: [
          {
            name: '最新消息-列表',
            controller: 'AnnouncementController',
            handler: 'findAll',
          },
          {
            name: '最新消息-查看',
            controller: 'AnnouncementController',
            handler: 'findOne',
          },
          {
            name: '最新消息-新增',
            controller: 'AnnouncementController',
            handler: 'create',
          },
          {
            name: '最新消息-修改',
            controller: 'AnnouncementController',
            handler: 'update',
          },
          {
            name: '最新消息-刪除',
            controller: 'AnnouncementController',
            handler: 'remove',
          },

          {
            name: '管理員管理-列表',
            controller: 'UserController',
            handler: 'findAll',
          },
          {
            name: '管理員管理-查看',
            controller: 'UserController',
            handler: 'findOne',
          },
          {
            name: '管理員管理-新增',
            controller: 'UserController',
            handler: 'create',
          },
          {
            name: '管理員管理-修改',
            controller: 'UserController',
            handler: 'update',
          },
          {
            name: '管理員管理-刪除',
            controller: 'UserController',
            handler: 'remove',
          },

          {
            name: '角色管理-列表',
            controller: 'RoleController',
            handler: 'findAll',
          },
          {
            name: '角色管理-查看',
            controller: 'RoleController',
            handler: 'findOne',
          },
          {
            name: '角色管理-新增',
            controller: 'RoleController',
            handler: 'create',
          },
          {
            name: '角色管理-修改',
            controller: 'RoleController',
            handler: 'update',
          },
          {
            name: '角色管理-刪除',
            controller: 'RoleController',
            handler: 'remove',
          },

          {
            name: '操作記錄-列表',
            controller: 'OperationRecController',
            handler: 'findAll',
          },
          {
            name: '操作記錄-查看',
            controller: 'OperationRecController',
            handler: 'findOne',
          },
        ],
        skipDuplicates: true,
      });
      return {
        success: true,
        user,
        permissions,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
