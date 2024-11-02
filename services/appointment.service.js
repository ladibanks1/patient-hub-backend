import appointmentModel from "../models/appointment.model.js";
import hospitalModel from "../models/hospital.model.js";
import patientModel from "../models/patient.model.js";
import staffModel from "../models/staff.model.js";
import databaseErrors from "../utils/databaseErrors.js";

// Book Appointment
const bookAppointment = async (details) => {
  try {
    const isBooked = await appointmentModel.create(details);
    // Add the appointment to the patient
    await patientModel.findByIdAndUpdate(isBooked.patient, {
      $addToSet: {
        appointments: isBooked._id,
        doctors: isBooked.doctor,
        hospitals: isBooked.hospital,
      },
    });
    // Add the appointment to the doctor
    await staffModel.findByIdAndUpdate(isBooked.doctor, {
      $addToSet: {
        appointments: isBooked._id,
        patients: isBooked.patient,
      },
    });
    // Add the appointment to the hospital
    await hospitalModel.findByIdAndUpdate(isBooked.hospital, {
      $addToSet: {
        appointments: isBooked._id,
        patients: isBooked.patient,
      },
    });
    return isBooked;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

// Cancel Appointment
const cancelAppointment = async (appointmentId) => {
  try {
    const isCancelled = await appointmentModel
      .findByIdAndUpdate(
        appointmentId,
        {
          status: "Cancelled",
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select("status");
    if (isCancelled === null)
      throw { message: "Appointment Not Found", statusCode: 404 };
    return isCancelled;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

// Confirm Appointment
const confirmAppointment = async (appointmentId) => {
  try {
    const isComfirmed = await appointmentModel
      .findByIdAndUpdate(
        appointmentId,
        {
          status: "Confirmed",
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select("status");
    if (isComfirmed === null)
      throw { message: "Appointment Not Found", statusCode: 404 };
    return isComfirmed;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

const appointmentCompleted = async (appointmentId) => {
  try {
    const isCompleted = await appointmentModel
      .findByIdAndUpdate(
        appointmentId,
        {
          status: "Completed",
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select("status");
    if (isCompleted === null)
      throw { message: "Appointment Not Found", statusCode: 404 };
    return isCompleted;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    // Delete the appointment
    const isDeleted = await appointmentModel.findByIdAndDelete(appointmentId);
    if (isDeleted === null)
      throw { message: "Appointment Not Found", statusCode: 404 };

    // Remove the appointment from the patient
    await patientModel.findByIdAndUpdate(isDeleted.patient, {
      $pull: {
        appointments: isDeleted._id,
        doctors: isDeleted.doctor,
        hospitals: isDeleted.hospital,
      },
    });
    // Remove the appointment to the doctor
    await staffModel.findByIdAndUpdate(isDeleted.doctor, {
      $pull: {
        appointments: isDeleted._id,
        patients: isDeleted.patient,
      },
    });
    // Remove the appointment to the hospital
    await hospitalModel.findByIdAndUpdate(isDeleted.hospital, {
      $pull: {
        appointments: isDeleted._id,
        patients: isDeleted.patient,
      },
    });

    return isDeleted;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

// Reschedule Appoinment
const rescheduleAppointment = async (appointmentId, appointmentDate) => {
  try {
    const isRescheduled = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        status: "Rescheduled",
        appointment_date: appointmentDate,
      },
      {
        runValidators: true,
        new: true,
      }
    ).select("status appointment_date")
    return isRescheduled;
  } catch (error) {
    const message = databaseErrors(error);
    const statusCode = error?.statusCode;
    throw { message, statusCode };
  }
};

// Export All Functions
export default {
  bookAppointment,
  cancelAppointment,
  confirmAppointment,
  appointmentCompleted,
  deleteAppointment,
  rescheduleAppointment,
};
