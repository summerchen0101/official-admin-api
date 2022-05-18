import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();
import * as dotenv from 'dotenv';

dotenv.config(); // Load the environment variables

async function main() {
  await prisma.user.upsert({
    where: { email: 'sp@admin.com' },
    update: {},
    create: {
      email: 'sp@admin.com',
      name: '超級管理員',
      password: await argon2.hash(process.env.DEFAULT_PASSWORD),
      role: {
        connectOrCreate: {
          where: { code: 'MASTER' },
          create: {
            name: '總管理員',
            code: 'MASTER',
            permissions: {
              create: [
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
              ],
            },
          },
        },
      },
    },
  });

  // await prisma.permission.upsert({
  //   create: {
  //     controller: ""
  //   }
  // })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
