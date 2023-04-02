import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from '../common/enums/user-type.enum';
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
      .overrideGuard(AuthGuard())
      .useValue({ canActivate: () => true })
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

  describe('update user profile', () => {
    const id = '12345';

    const dto = {
      firstName: 'first',
      lastName: 'last',
    };
    it('should call updateUserProfile service', () => {
      expect(controller.updateUserProfile(id, dto)).toHaveBeenCalled();
    });

    describe('update user type', () => {
      const id = '12345';

      const dto = {
        type: UserType.TENANT,
      };
      it('should call updateUserType service', () => {
        expect(controller.updateUserType(id, dto)).toHaveBeenCalled();
      });
    });
  });
});
