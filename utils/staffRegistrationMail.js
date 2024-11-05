import { createTransport } from "nodemailer";

const pass = process.env.EMAIL_PASSWORD;
const user = process.env.EMAIL;
const staffRegistrationMail = (loginDetails , password) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
  const mailOptions = {
    to: `${loginDetails.email}`,
    subject: `Welcome to ${loginDetails.hospital_id.name}! Your Login Details`,
    html: `
      <h1>Welcome to ${loginDetails.hospital_id.name}</h1>
      <p>Dear ${loginDetails.full_name},</p>
      <p>We are excited to have you join our team. Below are your login details for accessing our system:</p>
      <ul>
        <li><strong>Email:</strong> ${loginDetails.email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please make sure to change your password after your first login for security purposes.</p>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>The ${loginDetails.hospital_id.name} Team</p>
    `,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    });
  })
  

};
export default staffRegistrationMail;
