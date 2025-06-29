import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const userDto = {
        name: 'New User',
        roles: ['PERSONAL'],
        groups: ['GROUP_1'],
      };
      const user = service.create(userDto);
      expect(user).toHaveProperty('id');
      expect(user.name).toBe(userDto.name);
    });

    it('should reject duplicate names', () => {
      const userDto = {
        name: 'John Doe',
        roles: ['PERSONAL'],
        groups: ['GROUP_1'],
      };
      expect(() => service.create(userDto)).toThrow(ConflictException);
    });
  });

  describe('findManagedUsers', () => {
    it('should return empty for non-admin', () => {
      expect(service.findManagedUsers(3)).toEqual([]);
    });

    it('should return managed users for admin', () => {
      const managedUsers = service.findManagedUsers(1);
      expect(managedUsers.length).toBeGreaterThan(0);
      expect(managedUsers.every((u) => u.id !== 1)).toBeTruthy();
    });
  });
});
