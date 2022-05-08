import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { ROLES } from 'src/meta-consts';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES, roles);
