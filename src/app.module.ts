import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
