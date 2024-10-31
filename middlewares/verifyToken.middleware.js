import jwt from "jsonwebtoken";
import ErrorMessage from "../utils/errorMessage.js";
import { isTokenBlacklisted } from "../utils/blacklistToken.js";

const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
  // Verify Token

  // Check if token is provided
  if (req.headers?.["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    if(isTokenBlacklisted(token)){
      throw new ErrorMessage("Token is not Valid", 401);
    }
    // Jwt Verfication
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        next();
      } else {
        const error = new ErrorMessage(err.message, 401);
        next(error);
      }
    });
  } else {
    throw new ErrorMessage("Token is not Provided", 401);
  }
};

export default verifyToken;
