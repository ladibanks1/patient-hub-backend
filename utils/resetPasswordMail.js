import { createTransport } from "nodemailer";

const resetPasswordMail = (email, token) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: `
      <h1>Password Reset Request</h1>
      <p>We received a request to reset your password. Click the link below to choose a new password:</p>
      <a href="http://localhost:4000/auth/reset-password/${token}">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p>Thank you,<br/>The Patient Hub Team</p>
    `,
  });
};

export default resetPasswordMail;
