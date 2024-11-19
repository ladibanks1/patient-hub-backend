import patientService from "../services/patientProfile.service.js";
import ErrorMessage from "../utils/errorMessage.js";

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patientDetails = await patientService.profile(id);
    res.status(200).json({
      data: patientDetails,
      message: "Patient Found",
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
    const body = req.body;
    const data = {
      ...body,
      picture: req.file?.path,
    };
    const updatedDetails = await patientService.updateProfile(id, data);
    res.status(200).json({
      data: updatedDetails,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    // Delete from cloud if err occur
    if (req?.file) {
      try {
        await cloudinary.uploader.destroy(req?.file?.filename);
      } catch (error) {
        next(new ErrorMessage("Error in deleting image", 500));
      }
    }
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDetails = await patientService.deleteProfile(id);
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

const getAppointments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointments = await patientService.getAppointments(id);
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

export default { profile, updateProfile, deleteProfile, getAppointments };
