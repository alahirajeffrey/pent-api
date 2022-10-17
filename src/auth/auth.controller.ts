import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { VerificationMailDto } from './dto/verification-mail.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @Post('register')
    register(@Body() registerDto : RegisterDto){
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto)
    }

    @Post('password-change')
    changePassword(
        @Body() dto: ChangePasswordDto
    ){
        return this.authService.changePassword(dto)
    }

    @Post('send-verification-mail/:userId')
    sendVerificationMail(
        @Body() dto: VerificationMailDto,
        @Param('userId') userId: string
    ){
        return this.authService.sendVerificationEmail(dto, userId)
    }

    @Post('send-verification-mail')
    verifyEmail(
        @Body('') dto: VerifyUserDto
    ){
        return this.authService.verifyEmail(dto)
    }
}
