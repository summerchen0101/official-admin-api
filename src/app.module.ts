import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { JwtStrategy } from './user/strategies/jwt.strategy';
import { UserModule } from './user/user.module';
import { OperationRecModule } from './operation_rec/operation_rec.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { EventModule } from './event/event.module';
import { EventSectionModule } from './event-section/event-section.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    CategoryModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AnnouncementModule,
    OperationRecModule,
    PermissionModule,
    RoleModule,
    EventModule,
    EventSectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');
  }
}
