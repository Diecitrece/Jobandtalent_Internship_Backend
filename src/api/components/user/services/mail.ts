import 'dotenv/config';
import nodemailer from 'nodemailer';
import { User } from '../model';
export default async function sendEmail(user: User) {
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
    text: `Hello ${user.firstName}`,
  };

  const response = await transporter.sendMail(mailData);
  return response;
}
