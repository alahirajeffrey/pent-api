import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateApartmentDetailsDto{
    @IsOptional()
    @ApiProperty()
    @IsString()
    address: string

    @IsOptional()
    @ApiProperty()
    @IsString()
    details: string
}