import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PermissionGuard } from 'src/auth/permission.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PermissionGuard],
})
export class UsersModule {}
