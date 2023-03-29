import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@ApiHeader({ name: 'Authorization' })
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUserProfile(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch('updateProfile/:userId')
  updateUserProfile(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUserProfile(userId, dto);
  }

  @Patch('updateUserType/:userId')
  updateUserType(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserTypeDto,
  ) {
    return this.userService.updateUserType(userId, dto);
  }
}
