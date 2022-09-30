import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateReviewsDto {
    @ApiProperty()
    @IsString()
    apartmentReview: string 

    @ApiProperty()
    @IsString()
    environmentReview: string

    @ApiProperty()
    @IsString()
    amenitiesReview: string

    @ApiProperty()
    @IsString()
    landlordReview: string

    @ApiProperty()
    @IsString()
    apartmentId: string

    @ApiProperty()
    @IsString()
    reviewerId: string
}