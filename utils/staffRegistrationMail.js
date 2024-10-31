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
    subject: `Your Login Details from ${loginDetails.hospital_id.name}`,
    text: `Your email: ${loginDetails.email} Your Password: ${password} Kindly Login at Patient Hub`,
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
