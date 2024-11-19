import resetPassword from "../../services/auth/resetPassword.service.js";
import ErrorMessage from "../../utils/errorMessage.js";
import getToken from "../../utils/authJwt.js";
import resetPasswordMail from "../../utils/resetPasswordMail.js";
import jwt from "jsonwebtoken";

const forgetUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await resetPassword.forgetUserPassword(email);
    const token = getToken({ email: user.email } , "2m");
    resetPasswordMail(email, token);
    res.status(200).json({ message: "Reset password link sent to your email, Check your spam box" });
  } catch (error) {
    const err = new ErrorMessage(error.message, error?.statusCode || 401);
    next(err);
  }
};
const resetUserPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      const err = new ErrorMessage(error.message, error.code || 401);
      next(err);
    } else {
      try {
        const updatedPassword = await resetPassword.resetUserPassword(
          decoded.email,
          password
        );
        res.status(200).json({
          message: "Password Changed Successfully, Try Login",
          data: updatedPassword,
        });
      } catch (error) {
        next(error);
      }
    }
  });
};

export default {
  forgetUserPassword,
  resetUserPassword,
};
