import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  const mockReviewsService = {
    addReview: jest.fn((dto) => {}),
    editReview: jest.fn(),
    viewAllApartmentReviews: jest.fn((id) => {}),
    deleteReview: jest.fn(),
  };

  const mockUserService = {
    addReview: jest.fn((dto) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService, UserService],
    })
      .overrideGuard(AuthGuard())
      .useValue({ canActivate: () => true })
      .overrideProvider(ReviewsService)
      .useValue(mockReviewsService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create review', () => {
    const dto = {
      apartmentId: '12345',
      apartmentReview: 'good',
      reviewerId: '54321',
      environmentReview: 'good',
      amenitiesReview: 'good',
      landlordReview: 'good',
    };

    it('should call the createReview service', () => {
      expect(controller.addReview(dto)).toHaveBeenCalled();
      expect(controller.addReview(dto)).toHaveBeenCalledWith(dto);
    });

    it('should return return an object', () => {
      expect(controller.addReview(dto)).toEqual({});
    });
  });

  describe('view all apartment reviews', () => {
    const id = '12345';
    it('should call viewAllApartmentReviews service', () => {
      expect(controller.viewAllApartmentReviews(id)).toHaveBeenCalled();
      expect(controller.viewAllApartmentReviews(id)).toHaveBeenCalledWith(id);
    });

    it('should return an object', () => {
      expect(controller.viewAllApartmentReviews(id)).toEqual({});
    });
  });
});
