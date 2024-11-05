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
    subject: "Reset Password",
    html: `
            <h1>Your Password Reset Link</h1> 
            <p>Click the link below to reset your password</p>
            <a href="http://localhost:4000/reset-password/${token}">Reset Password</a>
        `,
  });
};

export default resetPasswordMail;
