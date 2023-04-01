import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getUser: jest.fn((userId) => {}),
    updateUserProfile: jest.fn((userId, dto) => {}),
    updateUserType: jest.fn((userId, dto) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get user', () => {
    const id = '12345';
    it('should call getUser service', () => {
      expect(controller.getUserProfile(id)).toHaveBeenCalled();
    });
  });
});
