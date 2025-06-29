import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): User | null {
    return this.usersService.update(parseInt(id), updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(parseInt(id));
  }

  @Get('managed/:id')
  findManagedUsers(@Param('id') id: string): User[] {
    return this.usersService.findManagedUsers(parseInt(id));
  }
}
