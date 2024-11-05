import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
const getToken = (details, maxAge = "1d") => {
  if (details) {
    const token = jwt.sign(details, secretKey, {
      expiresIn: maxAge,
    });
    return token;
  }
  return;
};
export default getToken;
