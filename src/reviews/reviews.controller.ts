import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateReviewsDto } from './dto/add-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Post()
  addReview(@Body() dto: CreateReviewsDto) {
    return this.reviewsService.addReview(dto);
  }

  @Get('/:apartmentId')
  viewAllApartmentReviews(@Param('apartmentId') apartmentId: string) {
    return this.reviewsService.viewAllApartmentReviews(apartmentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Patch('/:reviewId')
  editReview(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.editReview(reviewId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Delete('/:reviewerId/:reviewId')
  deleteReview(
    @Param('reviewerId') reviewerId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewsService.deleteReview(reviewerId, reviewId);
  }
}
