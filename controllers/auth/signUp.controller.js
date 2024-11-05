import ErrorMessage from "../../utils/errorMessage.js";
import authService from "../../services/auth/signup.service.js";
import getToken from "../../utils/authJwt.js";
import { cloudinary } from "../../config/cloudinary.config.js";

const hospitalSignIn = async (req, res, next) => {
  const body = req.body;
  try {
    const created = await authService.registerHospital(body);
    const token = getToken({ id: created._id }); /* Token Creation */
    res
      .status(201)
      .json({ token, data: created, message: "Hospital Created Successfully" });
  } catch (error) {
    const message = error.message;
    const code = error.statusCode;
    const err = new ErrorMessage(message, code);
    next(err);
  }
};

const patientSignIn = async (req, res, next) => {
  const body = req.body;
  try {
    let patientDetails = body;
    if (req.file) {
      patientDetails = {
        ...body,
        picture: req.file.path,
      };
    }
    const created = await authService.registerPatient(patientDetails);
    const token = getToken({ id: created._id }); /* Token Creation */
    res
      .status(201)
      .json({ token, data: created, message: "User Created Successfully" });
  } catch (error) {
    // Delete from cloud if err occur
    if (req.file) await cloudinary.uploader.destroy(req?.file?.filename);
    const message = error.message;
    const code = error.statusCode;
    const err = new ErrorMessage(message, code);
    next(err);
  }
};
const staffSignIn = async (req, res, next) => {
  const body = req.body;
  try {
    const staffDetails = {
      ...body,
      picture: req.file?.path,
    };
    const created = await authService.registerStaff(staffDetails);
    const token = getToken({ id: created._id }); /* Token Creation */
    res.status(201).json({
      token,
      data: created,
      message: "Staff Created Successfully,check your mail for login details",
    });
  } catch (error) {
    // Delete from cloud if err occur
    if (req?.file) await cloudinary.uploader.destroy(req?.file?.filename);
    const message = error.message;
    const code = error.statusCode;
    const err = new ErrorMessage(message, code);
    next(err);
  }
};

export default { hospitalSignIn, patientSignIn, staffSignIn };
