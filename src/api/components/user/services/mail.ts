import nodemailer from 'nodemailer';
import 'dotenv/config';
export default async function sendEmail() {
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
    to: 'juanfril@gmail.com',
    subject: `Message From A-Team-Project`,
    text: 'Hello world',
  };
  try {
    const response = await transporter.sendMail(mailData);
    return response;
  } catch (err) {
    return err;
  }
}
