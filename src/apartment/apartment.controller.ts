import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDetailsDto } from './dto/update-apartment-details.dto';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Post()
  createApartment(@Body() dto: CreateApartmentDto) {
    return this.apartmentService.createApartment(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Patch('/:apartmentId/:landlordId')
  updateApartment(
    @Param('apartmentId') apartmentId: string,
    @Param('landlordId') landlordId: string,
    @Body() dto: UpdateApartmentDetailsDto,
  ) {
    return this.apartmentService.updateApartment(apartmentId, landlordId, dto);
  }

  @Get('/:apartmentId')
  showSingleApartment(@Param('apartmentId') apartmentId: string) {
    return this.apartmentService.showSingleApartment(apartmentId);
  }

  @Get()
  showAllApartments() {
    return this.apartmentService.showAllApartments();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({ name: 'Authorization' })
  @Delete('/:apartmentId/:landlordId')
  removeApartment(
    @Param('apartmentId') apartmentId: string,
    @Param('landlordId') landlordId: string,
  ) {
    return this.apartmentService.removeApartment(apartmentId, landlordId);
  }
}
