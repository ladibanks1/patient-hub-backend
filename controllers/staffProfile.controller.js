import staffService from "../services/staffProfile.service.js";
import ErrorMessage from "../utils/errorMessage.js";

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staffDetails = await staffService.profile(id);
    res.status(200).json({
      data: staffDetails,
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
    const updatedDetails = await staffService.updateProfile(id, data);
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
    const deletedDetails = await staffService.deleteProfile(id);
    res.status(200).json({
      data: deletedDetails,
      message: "Document Deleted Successfully",
    });
  } catch (error) {
    const message = error.message;
    const statusCode = error?.statusCode || 404;
    const err = new ErrorMessage(message, statusCode);
    next(err);
  }
};

const rateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating } = req.query;
    const ratings = await staffService.rateStaff(id , rating)
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


export default { profile, updateProfile, deleteProfile , rateStaff };
