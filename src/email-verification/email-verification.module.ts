import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';



@Module({
  imports:[EmailVerificationModule],
  providers: [EmailVerificationService],

})
export class EmailVerificationModule {}
