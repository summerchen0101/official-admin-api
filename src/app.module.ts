import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Global()
@Module({
  imports: [ProductModule, UserModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
