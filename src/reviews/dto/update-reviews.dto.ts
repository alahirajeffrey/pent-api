import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  apartmentReview: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  environmentReview: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  amenitiesReview: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  landlordReview: string;
}
