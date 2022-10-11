import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/entities/apartment.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, User])],
  controllers: [ApartmentController],
  providers: [ApartmentService, UserService]
})
export class ApartmentModule {}
