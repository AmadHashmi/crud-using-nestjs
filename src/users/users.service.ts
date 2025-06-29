import { Injectable } from '@nestjs/common';
import { User, users } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [...users];

  findAll(): User[] {
    return this.users;
  }

  create(user: CreateUserDto): User {
    const newUser = { id: this.generateId(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<Omit<User, 'id'>>): User | null {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return this.users[userIndex];
  }

  delete(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length !== initialLength;
  }

  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
  }
}
