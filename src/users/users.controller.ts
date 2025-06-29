import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { PermissionGuard } from '../auth/permission.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(PermissionGuard)
  @SetMetadata('permission', 'VIEW')
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(PermissionGuard)
  @SetMetadata('permission', 'CREATE')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard)
  @SetMetadata('permission', 'EDIT')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ): User | null {
    return this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard)
  @SetMetadata('permission', 'DELETE')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('managed/:id')
  findManagedUsers(@Param('id', ParseIntPipe) id: number): User[] {
    return this.usersService.findManagedUsers(id);
  }
}
