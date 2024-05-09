import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from 'src/interfaces/validRoles.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, UserRoleGuard));
}
