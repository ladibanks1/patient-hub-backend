import hospitalService from "../services/hospitalProfile.service.js";
import ErrorMessage from "../utils/errorMessage.js";

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hospitalDetails = await hospitalService.profile(id);
    res.status(200).json({
      data: hospitalDetails,
      message: "Hospital Found",
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
      message: "Profile Updated Successfully",
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
      message: "Profile Deleted Successfully",
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

const getAppointments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointments = await hospitalService.getAppointments(id);
    res.status(200).json({
      data: appointments,
      message: "Appointments Found",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

// Get All Hospitals
const getAllHospitals = async (req, res, next) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json({
      data: hospitals,
      message: "Hospitals Found",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

export default {
  profile,
  updateProfile,
  deleteProfile,
  rateHospital,
  getHospitalDoctors,
  getAppointments,
  getAllHospitals,
};
