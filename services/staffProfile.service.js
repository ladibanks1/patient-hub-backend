import staffModel from "../models/staff.model.js";
import databaseErrors from "../utils/databaseErrors.js";
import hospitalService from "./hospitalProfile.service.js";
import patientService from "./patientProfile.service.js";
const profile = async (id) => {
  try {
    const doc = await staffModel
      .findById(id)
      .populate("appointments hospital_id")
      .exec();
    if (doc === null) throw { code: 404, message: "Staff not found" };
    return doc;
  } catch (error) {
    const message = error.message;
    const statusCode = error?.code || 400;
    throw { statusCode, message };
  }
};
const updateProfile = async (id, data) => {
  try {
    const doc = await staffModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (doc === null) throw { code: 404, message: "Staff not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

const deleteProfile = async (id) => {
  try {
    const doc = await staffModel.findByIdAndDelete(id);
    if (doc === null) throw { code: 404, message: "Staff not found" };
    await hospitalService.updateProfile(doc.hospital_id , {
      $pull : {staffs : doc._id}
    });
    // Remove the staff from the patients
    doc.patients.forEach(async (patientId) => {
      await patientService.updateProfile(patientId, {
        $pull : {doctors : doc._id}
      });
    });
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default { profile, updateProfile, deleteProfile };
