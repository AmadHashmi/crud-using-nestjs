import { Test } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { PermissionGuard } from '../../../src/auth/permission.guard';

const mockUsersService = {
  findAll: jest.fn().mockReturnValue([{ id: 1, name: 'Test User' }]),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
  findManagedUsers: jest.fn().mockReturnValue([]),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(PermissionGuard)
      .useValue({ canActivate: () => true }) // Mock guard
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /users', () => {
    it('should return array of users', () => {
      expect(controller.findAll()).toEqual([
        {
          id: 1,
          name: 'Test User',
        },
      ]);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('POST /users', () => {
    it('should create user', () => {
      const dto = { name: 'Test', roles: ['PERSONAL'], groups: ['GROUP_1'] };
      expect(controller.create(dto)).toEqual({
        id: 1,
        ...dto,
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /users/managed/:id', () => {
    it('should call service with id', () => {
      controller.findManagedUsers(1);
      expect(mockUsersService.findManagedUsers).toHaveBeenCalledWith(1);
    });
  });
});
