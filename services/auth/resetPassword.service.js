import hospitalModel from "../../models/hospital.model.js";
import patientModel from "../../models/patient.model.js";
import staffModel from "../../models/staff.model.js";
import ErrorMessage from "../../utils/errorMessage.js";

const forgetUserPassword = async (email) => {
  try {
    const hospital = await hospitalModel.findOne({ email });
    const patient = await patientModel.findOne({ email });
    const staff = await staffModel.findOne({ email });
    switch (true) {
      case !!hospital:
        return hospital;
      case !!patient:
        return patient;
      case !!staff:
        return staff;
      default:
        throw new ErrorMessage("User not found", 404);
    }
  } catch (error) {
    throw new ErrorMessage(error.message, error?.statusCode || 401);
  }
};

const resetUserPassword = async (email, pass) => {
  try {
    if (!pass) throw new ErrorMessage("Password is not provided", 401);
    const password = pass.trim()
    if(password.length < 6) throw new ErrorMessage("Password must be at least 6 characters" , 401) 
    const hospital = await hospitalModel.findOneAndUpdate(
      { email },
      { password },
      {
        runValidators: true,
        new: true,
      }
    );

    const patient = await patientModel.findOneAndUpdate(
      { email },
      { password },
      {
        runValidators: true,
        new: true,
      }
    );

    const staff = await staffModel.findOneAndUpdate(
      { email },
      { password },
      {
        runValidators: true,
        new: true,
      }
    );
    switch (true) {
      case !!hospital:
        return hospital;
      case !!patient:
        return patient;
      case !!staff:
        return staff;
      default:
        throw new ErrorMessage("User not found", 404);
    }
  } catch (error) {
    throw new ErrorMessage(error.message, error?.statusCode || 401);
  }
};

export default { forgetUserPassword, resetUserPassword };
