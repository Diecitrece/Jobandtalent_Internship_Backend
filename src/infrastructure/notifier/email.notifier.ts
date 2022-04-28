import { NotifierPort } from "../../core/application/ports/output/notifier.port";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import nodemailer from "nodemailer";
import { User } from "../../core/domain/user.model";

export const emailNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
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
      text: message,
    };

    transporter.verify((error, success) => {
      if (error) {
        console.log(`Mailing server error: ${error}`);
      } else {
        console.log("Mailing server is up", success);
      }
    });

    transporter.sendMail(mailData);
  };
  return { notify };
};
