import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApartmentModule } from './apartment/apartment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UserModule,
    ApartmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 