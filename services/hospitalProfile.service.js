import databaseErrors from "../utils/databaseErrors.js";
import hospitalModel from "../models/hospital.model.js";
import staffModel from "../models/staff.model.js";
import patientModel from "../models/patient.model.js";

const profile = async (id) => {
  try {
    const doc = await hospitalModel
      .findById(id)
      .populate("appointments staffs patients")
      .exec();
    if (doc === null) throw { code: 404, message: "Hospital not found" };
    return doc;
  } catch (error) {
    const message = error.message;
    const statusCode = error?.code || 400;
    throw { statusCode, message };
  }
};
const updateProfile = async (id, data) => {
  try {
    const doc = await hospitalModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (doc === null) throw { code: 404, message: "Hospital not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

const deleteProfile = async (id) => {
  try {
    // Remove the hospital from the Staffs
    const doc = await hospitalModel.findByIdAndDelete(id);
    if (doc === null) throw { code: 404, message: "Hospital not found" };
    doc.staffs.forEach(async (staff) => {
      try {
        await staffModel.findByIdAndDelete(staff);
      } catch (error) {
      throw { code: 404, message: "Staff not found" };
      }
    });
    // Remove the hospital from the Patients
    doc.patients.forEach(async (patient) => {
      try {
        await patientModel.findByIdAndUpdate(patient, {
          $pull : {hospitals : doc._id}
        });
      } catch (error) {
      throw { code: 404, message: "Patient not found" };
      }
    });
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default { profile, updateProfile, deleteProfile };
