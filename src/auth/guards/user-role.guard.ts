import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from '../entities/user.entity';
import { ValidRoles } from 'src/interfaces/validRoles.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: ValidRoles = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    for (const role of user.roles) {
      const { descRol } = role;

      if (requiredRoles.includes(descRol)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.username} needs to be ${requiredRoles} to access.`,
    );
  }
}
