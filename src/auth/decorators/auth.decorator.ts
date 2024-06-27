import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../../interfaces/validRoles.enum';
import { Roles } from './roles.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(Roles(roles), UseGuards(Auth, UserRoleGuard));
}
