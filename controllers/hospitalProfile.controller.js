import hospitalService from "../services/hospitalProfile.service.js";
import ErrorMessage from "../utils/errorMessage.js";

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hospitalDetails = await hospitalService.profile(id);
    res.status(200).json({
      data: hospitalDetails,
      message: "Document Found",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDetails = await hospitalService.updateProfile(id, data);
    res.status(200).json({
      data: updatedDetails,
      message: "Document Updated Successfully",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDetails = await hospitalService.deleteProfile(id);
    res.status(200).json({
      data: deletedDetails,
      message: "Hospital Deleted Successfully",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const rateHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating } = req.query;
    const ratings = await hospitalService.rateHospital(id, rating);
    res.status(200).json({
      data: ratings,
      message: "Thanks for rating us",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const getHospitalDoctors = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctors = await hospitalService.getHospitalDoctors(id);
    res.status(200).json({
      data: doctors,
      message: "Doctors Found",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};
export default { profile, updateProfile, deleteProfile, rateHospital , getHospitalDoctors };
