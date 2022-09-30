import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateReviewsDto {
    @ApiProperty()
    @IsNotEmpty()
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
    @IsNotEmpty()
    apartmentId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    reviewerId: string
}