import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/entities/apartment.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { urlToHttpOptions } from 'url';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDetailsDto } from './dto/update-apartment-details.dto';

@Injectable()
export class ApartmentService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Apartment)
        private readonly apartmentRepo: Repository<Apartment>
    ){}

    async createApartment(dto: CreateApartmentDto){
        try {
            //check if user is a landlord
            const user = await this.userRepo.findOne({where:{id: dto.landlordId}})
            if(user.type != 'landlord'){
                throw new HttpException("Only landlords can create apartments", HttpStatus.FORBIDDEN)
            }

            //create new apartment
            const newApartment = await this.apartmentRepo.save(dto)
            if(!newApartment){
                throw new HttpException("Apartment not created", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return newApartment
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async updateApartment(apartmentId: string, landlordId: string, dto: UpdateApartmentDetailsDto){
        try {
            //check if user owns the house
            const apartment = await this.apartmentRepo.findOne({where:{id: apartmentId}})
            if(apartment.landlordId != landlordId){
                throw new HttpException("Only the landlords of an apartment can update it", HttpStatus.FORBIDDEN)
            }   
            //update apartment
            const updatedApartment = await this.apartmentRepo.update(apartmentId, dto)
            if(!updatedApartment){
                throw new HttpException("Apartment not updated", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return {message:"Apartment updated successfully"}
            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async showSingleApartment(apartmentId: string){
        try {
            //check if apartment exists
            const apartmentExists = await this.apartmentRepo.findOne({where:{id:apartmentId}})
            if(!apartmentExists){
                throw new HttpException("Apartment does not exist", HttpStatus.NOT_FOUND)
            }
            //return apartment details
            return apartmentExists
            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async showAllApartments(){
        try {
            const apartments = this.apartmentRepo.find()
            if(!apartments){
                throw new HttpException("There are no apartments to show", HttpStatus.NO_CONTENT)
            }
            return apartments    
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeApartment(apartmentId: string, landlordId: string){
        try {
            //check if apartment exists and if 
            const apartmentExists = await this.apartmentRepo.findOne({where:{id:apartmentId}})

            if(apartmentExists && apartmentExists.landlordId==landlordId){
                const apartmentDeleted = this.apartmentRepo.delete(apartmentId)
                if(!apartmentDeleted){
                    throw new HttpException("apartment not deleted", HttpStatus.INTERNAL_SERVER_ERROR)
                }
                return {message:"apartment successfully deleted"}
            }
            if(!apartmentExists){
                throw new HttpException("apartment does not exist", HttpStatus.NOT_FOUND)   
            }
            if(apartmentExists.landlordId!=landlordId){
                throw new HttpException("you cannot delete an apartment you do not own", HttpStatus.FORBIDDEN)
            }

            
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
