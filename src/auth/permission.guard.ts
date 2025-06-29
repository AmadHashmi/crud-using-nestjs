import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const userId = request.headers.authorization;

    if (!userId) {
      throw new UnauthorizedException('Authorization header is required!');
    }

    const user = this.userService.findOne(parseInt(userId));

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userPermissions = user.roles.flatMap((roleCode) => {
      const role = ROLES.find((r) => r.code === roleCode);
      return role ? role.permissions : [];
    });

    if (!userPermissions.includes(requiredPermission)) {
      throw new UnauthorizedException(
        'Not allowed to perform action due to insufficient permissions',
      );
    }

    return true;
  }
}
