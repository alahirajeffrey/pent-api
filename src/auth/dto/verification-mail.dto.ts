import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerificationMailDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    recipient: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    subject: string
}