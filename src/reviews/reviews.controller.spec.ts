import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  const mockReviewsService = {
    addReview: jest.fn((dto) => {}),
    editReview: jest.fn((reviewId, dto) => {}),
    viewAllApartmentReviews: jest.fn((id) => {}),
    deleteReview: jest.fn((reviewId, reviewerId) => {}),
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
  });

  describe('view all apartment reviews', () => {
    const id = '12345';
    it('should call viewAllApartmentReviews service', () => {
      expect(controller.viewAllApartmentReviews(id)).toHaveBeenCalled();
      expect(controller.viewAllApartmentReviews(id)).toHaveBeenCalledWith(id);
    });
  });

  describe('edit review', () => {
    const reviewId = '12345';

    const dto = {
      apartmentReview: 'good',
      environmentReview: 'good',
      amenitiesReview: 'good',
      landlordReview: 'good',
    };

    it('should call the editReview service', () => {
      expect(controller.editReview(reviewId, dto)).toHaveBeenCalled();
      expect(controller.editReview(reviewId, dto)).toHaveBeenCalledWith(
        reviewId,
        dto,
      );
    });
  });

  describe('delete review', () => {
    const reviewerId = '12345';
    const reviewId = '12345';
    it('should call the deleteReview service', () => {
      expect(controller.deleteReview(reviewId, reviewerId)).toHaveBeenCalled();
      expect(
        controller.deleteReview(reviewId, reviewerId),
      ).toHaveBeenCalledWith(reviewId, reviewerId);
    });
  });
});
