import { Body, Controller, Get, Header, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@ApiHeader({name: "Authorization"})
@ApiTags("User")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get(':userId')
    getUserProfile(
        @Param("userId") userId: string){
        return this.userService.getUser(userId)
    }

    @Patch(':userId')
    updateUserProfile(
        @Param('userId') userId: string, 
        @Body() dto: UpdateUserDto){
            return this.userService.updateUser(userId, dto)
        }
}
