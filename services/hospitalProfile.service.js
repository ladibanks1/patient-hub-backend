import databaseErrors from "../utils/databaseErrors.js";
import hospitalModel from "../models/hospital.model.js";
import staffModel from "../models/staff.model.js";
import appointmentService from "./appointment.service.js";

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

    // Remove the hospital from the Appointments, Patients and Staffs
    doc.appointments.forEach(async (appointmentId) => {
      await appointmentService.deleteAppointment(appointmentId);
    });


    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default { profile, updateProfile, deleteProfile };
