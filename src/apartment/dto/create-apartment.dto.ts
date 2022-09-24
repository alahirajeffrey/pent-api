import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateApartmentDto{
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    address: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    imagesLink: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    details: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    landlordId: string
}