import { User as UserModal } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserDto implements Partial<UserModal> {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
