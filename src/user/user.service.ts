import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
    ){}

    // update user details
    async updateUserProfile(userId: string, dto: UpdateUserDto){
        try{
            //update user
            const updateduser = await this.userRepo.update({id : userId}, dto)
            if(!updateduser){
                throw new HttpException("user not updated", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            //return updated user
            return {message:"user updated"}

        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // get single user
    async getUser(userId: string){
        try{
            // find user details
            const user = await this.userRepo.findOne({where:{id : userId}})

            //return user
            delete user.password
            return user
        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUserType(userId: string, dto: UpdateUserTypeDto){
        try{
            //update user
            const updatedRole = await this.userRepo.update(userId, dto)
            if(!updatedRole){
                throw new HttpException("user type not updated", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            //return updated user
            return {message:"user type updated"}

        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
