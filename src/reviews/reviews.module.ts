import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/entities/apartment.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Apartment, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
