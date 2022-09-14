import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"

export class UpdateUserDto{
    
    @ApiProperty()
    @IsOptional()
    firstName: string

    @ApiProperty()
    @IsOptional()
    lastName: string
}