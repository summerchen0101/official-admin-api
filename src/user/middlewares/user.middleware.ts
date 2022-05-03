import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  use(req: any, res: any, next: (error?: any) => void) {
    const user_id = req.session.user_id;
    if (user_id) {
      const user = this.userService.findOne(user_id);
      req.user = user;
    }
    next();
  }
}
