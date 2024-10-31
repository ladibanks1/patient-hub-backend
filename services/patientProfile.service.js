import patientModel from "../models/patient.model.js";
import databaseErrors from "../utils/databaseErrors.js";
const profile = async (id) => {
  try {
    const doc = await patientModel
      .findById(id)
      .populate("appointments doctors hospitals")
      .exec();
    if (doc === null) throw { code: 404, message: "Patient not found" };
    return doc;
  } catch (error) {
    const message = error.message;
    const statusCode = error?.code || 400;
    throw { statusCode, message };
  }
};
const updateProfile = async (id, data) => {
  try {
    const doc = await patientModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (doc === null) throw { code: 404, message: "Patient not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

const deleteProfile = async (id) => {
  try {
    const doc = await patientModel.findByIdAndDelete(id);
    if (doc === null) throw { code: 404, message: "Patient not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default { profile, updateProfile, deleteProfile };
