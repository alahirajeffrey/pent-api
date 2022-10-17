import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyUserDto{
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    otp: string
}