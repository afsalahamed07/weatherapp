import nodemailer from "nodemailer";
import dontenv from "dotenv";

dontenv.config();

const options = {
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  secure: false, // set to true if you're using SSL
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
};

const transporter = nodemailer.createTransport(options);

export async function sendMail(to: string, subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Message not sent:", error);
    throw error;
  }
}
