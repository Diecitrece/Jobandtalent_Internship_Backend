import NotifierPort from '@ports/output/notifier.port';
import nodemailer from 'nodemailer';

export default async function sendEmail(notifierPort: NotifierPort) {
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
    //TODO: change to real email
    to: notifierRepository.user.email,
    subject: `Message From A-Team-Project`,
    //TODO: change to real message
    text: `Hello ${user.arguments.firstName}`,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log(`error: ${error}`);
    } else {
      console.log('Server is ready to take our messages', success);
    }
  });

  const response = transporter.sendMail(mailData);
  return response;
}
