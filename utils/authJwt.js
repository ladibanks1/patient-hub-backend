import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
const getToken = (details) => {
  if (details) {
    const token = jwt.sign(details, secretKey , {
      expiresIn : "1d",
    });
    return token
  }
  return;
};
export default getToken;
