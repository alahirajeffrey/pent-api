import { Body, Controller, Delete, Get, Patch, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDetailsDto } from './dto/update-apartment-details.dto';

@UseGuards(AuthGuard('jwt'))
@ApiHeader({name: "Authorization"})
@ApiTags("Apartment")
@Controller('apartment')
export class ApartmentController {
    constructor(
        private readonly apartmentService: ApartmentService
    ){}

    @Post()
    createApartment(
        @Body() dto: CreateApartmentDto
        ){
        return this.apartmentService.createApartment(dto)
    }

    @Patch('/:apartmentId/:landlordId')
    updateApartment(
        @Param('apartmentId') apartmentId: string,
        @Param('landlordId') landlordId: string,
        @Body() dto: UpdateApartmentDetailsDto
    ){
        return this.apartmentService.updateApartment(apartmentId, landlordId, dto)
    }
    
    @Get('/:apartmentId')
    showSingleApartment(
        @Param('apartmentId') apartmentId: string
    ){
        return this.apartmentService.showSingleApartment(apartmentId)
    }

    @Get()
    showAllApartments(){
        return this.apartmentService.showAllApartments()
    }

    @Delete('/:apartmentId/:landlordId')
    removeApartment(
        @Param('apartmentId') apartmentId: string,
        @Param('landlordId') landlordId: string
    ){
        return this.apartmentService.removeApartment(apartmentId, landlordId)
    }



}
