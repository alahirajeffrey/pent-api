import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailVerificationService {
    private nodeMailerTransport: Mail
    constructor(
        private readonly configService : ConfigService
    ){
        //setup mail service provider
        this.nodeMailerTransport = createTransport({
            service: configService.get('EMAIL_SERVICE'),
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASSWORD')
            }
        })
    }

    sendMail(options: Mail.Options){
        return this.nodeMailerTransport.sendMail(options)
    }
}
