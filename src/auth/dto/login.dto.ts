import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto{
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email : string

    @ApiProperty()
    @IsNotEmpty()
    password: string
}