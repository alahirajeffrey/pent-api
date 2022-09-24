import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/entities/apartment.entity';
import { User } from 'src/entities/user.entity';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, User])],
  controllers: [ApartmentController],
  providers: [ApartmentService]
})
export class ApartmentModule {}
