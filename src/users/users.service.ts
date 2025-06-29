import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, users } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [...users];

  findAll(): User[] {
    return this.users;
  }

  create(user: CreateUserDto): User {
    if (
      this.users.some(
        (u) => u.name.toLocaleLowerCase() === user.name.toLocaleLowerCase(),
      )
    ) {
      throw new ConflictException('User with this name already exists!');
    }
    const newUser = { id: this.generateId(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<Omit<User, 'id'>>): User | null {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return this.users[userIndex];
  }

  delete(id: number): { success: boolean; message?: string } {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);

    return {
      success: this.users.length !== initialLength,
      message:
        this.users.length !== initialLength
          ? 'User deleted successfully'
          : 'User not found',
    };
  }

  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
  }

  findOne(id: number): User | null {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findManagedUsers(managerId: number): User[] {
    const manager = this.findOne(managerId);
    if (!manager || !manager.roles.includes('ADMIN')) return [];

    return this.users.filter(
      (user) =>
        user.groups.some((group) => manager.groups.includes(group)) &&
        user.id !== managerId,
    );
  }
}
