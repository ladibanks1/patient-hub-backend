import staffModel from "../models/staff.model.js";
import databaseErrors from "../utils/databaseErrors.js";
import hospitalService from "./hospitalProfile.service.js";
import appointmentService from "./appointment.service.js";
const profile = async (id) => {
  try {
    const doc = await staffModel
      .findById(id)
      .populate("appointments hospital_id patients")
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
    await hospitalService.updateProfile(doc.hospital_id, {
      $pull: { staffs: doc._id },
    });

    // Remove the staff from the appointments , patients and hospital
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

const rateStaff = async (id, ratings) => {
  try {
    if (ratings) {
      const rating = await staffModel
        .findByIdAndUpdate(
          id,
          {
            $push: {
              ratings,
            },
          },
          {
            runValidators: true,
          }
        )
        .select("rating");
      return rating;
    }
    throw {
      message: "Kindly rate the hospital to help improve the app",
      statusCode: 400,
    };
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

const getAppointments = async (id) => {
  try {
    const doc = await staffModel
      .findById(id)
      .populate({
        path: "appointments",
        populate: {
          path: "patient hospital",
        },
      })
      .select("appoinments")
      .exec();
    if (doc === null) throw { code: 404, message: "Staff not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};
export default {
  profile,
  updateProfile,
  deleteProfile,
  rateStaff,
  getAppointments,
};
