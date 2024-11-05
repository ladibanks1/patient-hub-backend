import patientModel from "../models/patient.model.js";
import databaseErrors from "../utils/databaseErrors.js";
import appointmentService from "./appointment.service.js";

// Show Profile
const profile = async (id) => {
  try {
    const doc = await patientModel
      .findById(id)
      .populate("doctors hospitals")
      .exec();
    if (doc === null) throw { code: 404, message: "Patient not found" };
    return doc;
  } catch (error) {
    const message = error.message;
    const statusCode = error?.code || 400;
    throw { statusCode, message };
  }
};
// Update Profile
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

    // If patient is deleted , appointment should be deleted with related doctor and hospital
    doc.appointments.forEach(async (appointmentId) => {
      try {
        await appointmentService.deleteAppointment(appointmentId);
      } catch (error) {
        throw error;
      }
    });
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

const getAppointments = async (id) => {
  try {
    const doc = await patientModel
      .findById(id)
      .populate({
        path: "appointments",
        populate: {
          path: "doctor hospital",
        },
      })
      .select("appointments")
      .exec();
    if (doc === null) throw { code: 404, message: "Patient not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default { profile, updateProfile, deleteProfile, getAppointments };
