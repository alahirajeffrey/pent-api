import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({})],
  providers: [AuthService, JwtStrategy, EmailVerificationService],
  controllers: [AuthController]
})
export class AuthModule {}
