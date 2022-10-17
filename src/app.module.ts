import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ReviewsModule } from './reviews/reviews.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UserModule,
    ApartmentModule,
    ReviewsModule,
    EmailVerificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 