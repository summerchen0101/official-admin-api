import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class DefaultUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    const { items } = await this.userService.findAll({ email: 'sp@admin.com' });
    if (!items.length) {
      await this.userService.create({
        email: 'sp@admin.com',
        name: '超級管理員',
        password: 'aa1234',
        role: 'ADMIN',
      });
      console.log('successed create default admin (sp@admin.com/aa1234)');
    }
    next();
  }
}
