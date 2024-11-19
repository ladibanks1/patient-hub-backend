import databaseErrors from "../utils/databaseErrors.js";
import hospitalModel from "../models/hospital.model.js";
import staffModel from "../models/staff.model.js";
import appointmentService from "./appointment.service.js";

const profile = async (id) => {
  try {
    const doc = await hospitalModel
      .findById(id)
      .populate({
        path: "staffs patients",
        select: "first_name last_name email tel position specialism gender DOB ratings",
        populate: {
          path: "appointments",
        }
      })
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

const rateHospital = async (id, ratings) => {
  try {
    if (ratings) {
      const rating = await hospitalModel
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
// Get all doctors in a hospital
const getHospitalDoctors = async (id) => {
  try {
    const doctors = await staffModel.find({
      $and: [
        { hospital_id: id },
        {
          position: {
            $regex: /doctor/i,
          },
        },
      ],
    });
    if (!doctors) throw { code: 404, message: "Doctors not found" };
    return doctors;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

// Get all appointments in a hospital
const getAppointments = async (id) => {
  try {
    const doc = await hospitalModel
      .findById(id)
      .populate({
        path: "appointments",
        populate: {
          path: "doctor patient",
        },
      })
      .select("appoinments")
      .exec();
    if (doc === null) throw { code: 404, message: "Hospital not found" };
    return doc;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.code || 400;
    throw { message, statusCode };
  }
};

// Get All Hospitals
const getAllHospitals = async () => {
  try {
    const allHospitals = await hospitalModel.find({});
    if (allHospitals.length === 0)
      throw { code: 404, message: "No Hospitals Found" };
    return allHospitals;
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
  rateHospital,
  getHospitalDoctors,
  getAppointments,
  getAllHospitals,
};
