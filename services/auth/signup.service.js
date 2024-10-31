import hospitalModel from "../../models/hospital.model.js"; /* Hospital  Model */
import patientModel from "../../models/patient.model.js"; /* Patient  Model */
import staffModel from "../../models/staff.model.js"; /*  Staff   Model */
import ErrorMessage from "../../utils/errorMessage.js"; // Handle for Error Messages And Code
import databaseError from "../../utils/databaseErrors.js";

const registerHospital = async (data) => {
  try {
    const createHospital = await hospitalModel.create(data);
    return createHospital;
  } catch (error) {
    const err = databaseError(error);
    const message = err;
    const statusCode = error?.code || 400;
    throw new ErrorMessage(message, statusCode);
  }
};

const registerPatient = async (data) => {
  try {
    const createPatient = await patientModel.create(data);
    return createPatient;
  } catch (error) {
    const err = databaseError(error);
    const message = err;
    const statusCode = error?.code || 400;
    throw new ErrorMessage(message, statusCode);
  }
};
const registerStaff = async (data) => {
  try {
    // Create The staff
    const createStaff = await staffModel.create(data);

    // Add Create Staff to The hospital
    await hospitalModel.findByIdAndUpdate(createStaff.hospital_id, {
      $push: { staffs: createStaff._id },
    });
    // Return The Created Staff
    return createStaff;
  } catch (error) {
    const err = databaseError(error);
    const message = err;
    const statusCode = error?.code || 400;
    throw new ErrorMessage(message, statusCode);
  }
};

export default { registerHospital, registerPatient, registerStaff };
