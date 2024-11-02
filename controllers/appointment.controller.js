import appointmentService from "../services/appointment.service.js";
import ErrorMessage from "../utils/errorMessage.js";

// Book Appointment
const bookAppointment = async (req, res, next) => {
  try {
    const details = req.body;
    const isBooked = await appointmentService.bookAppointment(details);
    res.status(200).json({
      message: "Appointment Booked Successfully",
      data: isBooked,
    });
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

// Cancel Appointment
const cancelAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const isCancelled = await appointmentService.cancelAppointment(
      appointmentId
    );
    res.status(200).json({
      message: "Appointment Cancelled Successfully",
      data: isCancelled,
    });
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

// Confirm Appointment
const confirmAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const isConfirmed = await appointmentService.confirmAppointment(
      appointmentId
    );
    res.status(200).json({
      message: "Appointment Confirmed",
      data: isConfirmed,
    });
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

// Completed the Appointment
const appointmentCompleted = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const isCompleted = await appointmentService.appointmentCompleted(
      appointmentId
    );
    res.status(200).json({
      message: "Appointment Completed",
      data: isCompleted,
    });
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

// Delete Appointment
const deleteAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const isDeleted = await appointmentService.deleteAppointment(appointmentId);
    res.status(200).json({
      message: "Appointment Completed",
      data: isDeleted,
    });
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

// Reschedule Appointment
const rescheduleAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const appointmentDate = req.query.date;
    if (appointmentDate) {
      const isRescheduled = await appointmentService.rescheduleAppointment(
        appointmentId,
        appointmentDate
      );
      res.status(200).json({
        message: "Appointment Rescheduled",
        data: isRescheduled,
      });
    }else{
      throw {message : "Date is not Provided"  , statusCode : 400}
    }
  } catch (error) {
    const err = new ErrorMessage(error.message, error.statusCode || 400);
    next(err);
  }
};

const getAllAppointment = async(req , res , next) => {
  try {
    
  } catch (error) {
    
  }

}

export default {
  bookAppointment,
  confirmAppointment,
  cancelAppointment,
  appointmentCompleted,
  deleteAppointment,
  rescheduleAppointment,
  getAllAppointment
};
