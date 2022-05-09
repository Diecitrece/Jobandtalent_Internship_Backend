import { NotifierPort } from '../../core/application/ports/output/notifier.port';
import nodemailer from 'nodemailer';
import { User } from '../../core/domain/user.model';
import { registrationTemplate } from './templates/registration.template';

export const emailNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.EMAIL_NODEMAILER_PASSWORD,
      },
    });
    const mailData = {
      from: process.env.EMAIL_NODEMAILER,
      to: user.email,
      subject: `Message From A-Team-Project`,
      html: registrationTemplate(user, message),
    };

    transporter.verify((error) => {
      if (error) {
        console.log(`Mailing server error: ${error}`);
        return;
      }
      console.log('Mailing server is up');
    });

    transporter.sendMail(mailData);
  };
  return { notify };
};
