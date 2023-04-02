import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn((dto) => {}),
    login: jest.fn((dto) => {}),
    changePassword: jest.fn((dto) => {}),
    sendVerificationEmail: jest.fn((dto, userId) => {}),
    verifyEmail: jest.fn((dto) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register user', () => {
    const dto = {
      email: 'email@email.com',
      password: 'password',
      firstName: 'first',
      lastName: 'second',
    };

    it('should call registerUser service', () => {
      expect(controller.register(dto)).toHaveBeenCalled();
      expect(controller.register(dto)).toHaveBeenCalledWith(dto);
    });
  });

  describe('login user', () => {
    const dto = {
      email: 'email@email.com',
      password: 'password',
    };

    it('should call loginUser service', () => {
      expect(controller.login(dto)).toHaveBeenCalled();
      expect(controller.login(dto)).toHaveBeenCalledWith(dto);
    });
  });

  describe('change password', () => {
    const dto = {
      oldPassword: 'password',
      newPassword: 'password',
      email: 'email@email.com',
    };
    it('should call changePassword service', () => {
      expect(controller.changePassword(dto)).toHaveBeenCalled();
      expect(controller.changePassword(dto)).toHaveBeenCalledWith(dto);
    });
  });

  describe('send verification email', () => {
    const userId = '12345';

    const dto = {
      recipient: 'email@email.com',
      subject: 'email2@email.com',
    };
    it('should call sendVerificationMail service', () => {
      expect(controller.sendVerificationMail(dto, userId)).toHaveBeenCalled();
      expect(controller.sendVerificationMail(dto, userId)).toHaveBeenCalledWith(
        dto,
        userId,
      );
    });
  });

  describe('verify email', () => {
    const dto = {
      email: 'email@email.com',
      otp: '12345',
    };
    it('should call verifyEmail service', () => {
      expect(controller.verifyEmail(dto)).toHaveBeenCalled();
      expect(controller.verifyEmail(dto)).toHaveBeenCalledWith(dto);
    });
  });
});
