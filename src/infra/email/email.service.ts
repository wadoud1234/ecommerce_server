import { Injectable } from '@nestjs/common';
import { CreateEmailResponseSuccess, ErrorResponse, Resend } from 'resend';

@Injectable()
export class EmailService {
    service: Resend
    constructor() {

        this.service = new Resend('re_eEH6KwoD_Go4qxDpB7hERS314L5waVWMc');

        // resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: 'wadoudazer1234@gmail.com',
        //     subject: 'Hello World',
        //     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        // });
    }
    
    async sendCustomEmail(from: string, to: string, subject: string, html: string): Promise<CreateEmailResponseSuccess | null | ErrorResponse> {
        const { data, error } = await this.service.emails.send({
            from,
            to,
            subject,
            html
        })
        if (error) {
            return error
        }
        return data
    }
}
