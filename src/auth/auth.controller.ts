import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

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
}
