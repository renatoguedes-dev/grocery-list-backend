import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

class EmailService {
  async sendPasswordResetEmail(token: string, email: string) {
    const resetLink = `https://grocery-planner.netlify.app/reset-password?token=${token}`;

    const mailOptions = {
      from: `Grocery Planner <${process.env.GMAIL_USERNAME}>`,
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink} \nThe link will expire in 15 minutes`,
      html: `
            <p>Click the following link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <br>
            <p>The link will expire in 15 minutes.</p>
            `,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  }
}

export default new EmailService();
