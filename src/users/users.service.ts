import { Injectable } from '@nestjs/common';
import { User, users } from './user.model';

@Injectable()
export class UsersService {
  private user: User[] = [...users];

  findAll(): User[] {
    return this.user;
  }
}
