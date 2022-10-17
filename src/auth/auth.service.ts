import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { VerificationMailDto } from './dto/verification-mail.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
        private emailService : EmailVerificationService
    ){}

    // generate random otp 
    generateOtp(): string{
        return Math.floor(Math.random() * 899999 + 10000).toString()
    }

    // function to create access tokens when user logs in
    async signToken(userId : string, email: string) : Promise<Object>{
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.config.get("EXPIRES_IN"),
            secret: this.config.get("JWT_SECRET") 
        })

        return {access_token : token}
    }

    async checkUserDoesNotExist(email: string){
        //check if user does not exist
        const userExists = await this.userRepo.findOne({ where:{email: email}})
        if(!userExists){
            throw new HttpException("user does not exists", HttpStatus.FORBIDDEN)
        }

        return userExists
    }

    async checkUserExists(email: string){
        //check if user exists
        const userExists = await this.userRepo.findOne({ where:{email: email}})
        if(userExists){
            throw new HttpException("user already exists", HttpStatus.FORBIDDEN)
        }
    }

    //function to register new user
    async register(dto : RegisterDto){
        try{
            //check if user already exists
            await this.checkUserExists(dto.email)

            //generate password hash
            const hash = await argon2.hash(dto.password)

            //save details to db
            const newUser = await this.userRepo.save({
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                password: hash
            })

            // return saved user
            delete newUser.password 
            return newUser

        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async changePassword(dto : ChangePasswordDto){
        try {
            //check to see if user exists
            const userExists = await this.checkUserDoesNotExist(dto.email)
            
            // check to see if password matches
            const passwordMatches = await argon2.verify(userExists.password, dto.oldPassword)
            if(!passwordMatches){
                throw new HttpException("incorrect password", HttpStatus.FORBIDDEN)
            }

            //update password
            const newPasswordHash = await argon2.hash(dto.newPassword)
            await this.userRepo.update(userExists.id, {password: newPasswordHash})

            return {message: "Password changed"}
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //function to log a user in
    async login(dto : LoginDto){   
        try {
            //check if user does not exist
            const userExists = await this.checkUserDoesNotExist(dto.email)

            //check if password is correct
            const passwordMatches = await argon2.verify(userExists.password, dto.password)
            if(!passwordMatches){
                throw new HttpException("incorrect password", HttpStatus.FORBIDDEN)
            }

            //return token
            return await this.signToken(userExists.id, userExists.email)

        }catch(error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // send verification to user email
    async sendVerificationEmail(dto: VerificationMailDto, userId: string){
        try {
            //generate otp
            const otp = this.generateOtp()

            //send otp to verify email
            this.emailService.sendMail({
                to: dto.recipient,
                subject: dto.subject,
                text: `Your OTP : ${otp}`
            })

            await this.userRepo.update(userId,{otp: otp})

            return {message: "Verification mail sent"}
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        } 
    }

    // verify user email
    async verifyEmail(dto: VerifyUserDto){
        try {
            //check user otp
            const userExists = await this.checkUserDoesNotExist(dto.email)
            if(userExists.otp !== dto.otp){
                throw new HttpException("Incorrect otp", HttpStatus.FORBIDDEN)   
            }

            // verify user
            await this.userRepo.update(userExists.id, {isEmailVerified: true})
            //delete otp
            await this.userRepo.update(userExists.id, {otp:null})
            return {message: 'User verified'}
            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
