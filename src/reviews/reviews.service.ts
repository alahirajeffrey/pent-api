import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/entities/apartment.entity';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewsDto } from './dto/add-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewsRepo : Repository<Review>,
        @InjectRepository(Apartment)
        private readonly apartmentRepo : Repository<Apartment> 
    ){}

    async checkReviewExists(reviewId: string){
        // check if review exists
        const reviewExists = await this.reviewsRepo.findOne({where:{id: reviewId}})

        if(!reviewExists){
            throw new HttpException("Review does not exist", HttpStatus.NOT_FOUND)
        }
        return reviewExists
    }

    async addReview(dto: CreateReviewsDto){
        try {
            //check if apartment exists
            const apartmentExists = await this.apartmentRepo.findOne({where:{id: dto.apartmentId}})
            if(!apartmentExists){
                throw new HttpException("Apartment does not exist", HttpStatus.NOT_FOUND)
            }

            //ensure apartment landlord cannot post reviews 
            if(apartmentExists.landlordId === dto.reviewerId){
                throw new HttpException("Apartment owner cannot post reviews", HttpStatus.UNAUTHORIZED)
            }

            //save apartment
            const createdApartment = await this.reviewsRepo.save(dto)
            if(!createdApartment){
                throw new HttpException("Review not saved", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return createdApartment
            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async editReview(reviewId: string, dto: UpdateReviewDto){
        try {
            //check if review exist
            const reviewExists = await this.reviewsRepo.findOne({where:{id:reviewId}})
            if(!reviewExists){
                throw new HttpException("Review does not exist", HttpStatus.NOT_FOUND)
            }
            //update review
            const updatedReview = await this.reviewsRepo.update(reviewId, dto)
            if(!updatedReview){
                throw new HttpException("Review not updated", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return {message : "Review updated"}

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async viewAllApartmentReviews(apartmentId: string){
        try {
            //check apartment reviews exist
            const apartmentReviewsExist = await this.reviewsRepo.find({where:{apartmentId: apartmentId}})
            if(!apartmentReviewsExist){
                throw new HttpException("There are no reviews for this apartment", HttpStatus.NOT_FOUND) 
            }
            //return reviews
            return apartmentReviewsExist
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteReview(reviewerId: string, reviewId: string){
        try {
            const reviewExist = await this.checkReviewExists(reviewId)
            
            //ensure only revewer can delete reviews
            if(reviewerId !== reviewExist.reviewerId){
                throw new HttpException("You cannot delete a review you did not write", HttpStatus.UNAUTHORIZED)
            }

            const reviewDeleted = await this.reviewsRepo.delete(reviewId)
            if(!reviewDeleted){
                throw new HttpException("Review not deleted", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return {message: "Review deleted"}

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
