import { RoleType, User as UserModal } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserDto implements Partial<UserModal> {
  @Exclude()
  password?: string;
}
