import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductModule, UserModule, CategoryModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
