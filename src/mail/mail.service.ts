import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';
import { text } from 'stream/consumers';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    console.log(options);
    //this.sendEmail('testing', 'test', 'jubace@kakao.com');
  }

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
    to: string,
  ) {
    const form = new FormData();
    form.append('from', `Nuber Eats User <mailgun@${this.options.fromEmail}>`);
    form.append('to', to);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    form.append('subject', subject);

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      'Verify Your Email',
      'verify-email',
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
      email,
    );
  }
}
