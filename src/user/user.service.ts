import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
    ){}

    // update user details
    async updateUser(userId: string, dto: UpdateUserDto){
        try{
            //update user
            const updateduser = await this.userRepo.update({userId : userId}, dto)
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
            const user = await this.userRepo.findOne({where:{userId : userId}})

            //return user
            delete user.password
            return user
        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
