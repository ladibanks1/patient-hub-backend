import hospitalModel from "../../models/hospital.model.js"; /* Hospital  Model */
import patientModel from "../../models/patient.model.js"; /* Patient  Model */
import staffModel from "../../models/staff.model.js"; /*  Staff   Model */
import ErrorMessage from "../../utils/errorMessage.js"; // Handle for Error Messages And Code
import { comparePassword } from "../../utils/passwords.js";

const patientLogin = async (credentials) => {
  try {
    // Credentials Verification
    const { email, password } = credentials;
    const isEmailValid = await patientModel.findOne({ email });
    if (isEmailValid) {
      const isPasswordValid = await comparePassword(
        password,
        isEmailValid.password
      );

      const error = { statusCode: 401, message: "Incorrect Password" };

      if (isPasswordValid) {
        return isEmailValid;
      } else {
        throw error;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw new ErrorMessage(error.message, error?.statusCode || 401);
  }
};
const doctorLogin = async (credentials) => {
  try {
    // Credentials Verification

    const { email, password } = credentials;
    // Find the staff and check if it a doctor
    const isEmailValid = await staffModel.findOne({ email  , position: /doctor/i});
    if (isEmailValid) {
      const isPasswordValid = await comparePassword(
        password,
        isEmailValid.password
      );

      const error = { statusCode: 401, message: "Incorrect Passsword" };

      if (isPasswordValid) {
        return isEmailValid;
      } else {
        throw error;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw new ErrorMessage(error.message, error?.statusCode || 401);
  }
};
const hospitaLogin = async (credentials) => {
  try {
    // Credentials Verification

    const { email, password } = credentials;
    const isEmailValid = await hospitalModel.findOne({ email });

    if (isEmailValid) {
      const isPasswordValid = await comparePassword(
        password,
        isEmailValid.password
      );

      const error = { statusCode: 401, message: "Incorrect Passsword" };

      if (isPasswordValid) {
        return isEmailValid;
      } else {
        throw error;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw new ErrorMessage(error.message, error?.statusCode || 401);
  }
};

export default { patientLogin, doctorLogin, hospitaLogin };
