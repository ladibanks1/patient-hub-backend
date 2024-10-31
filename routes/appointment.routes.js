import {Router} from 'express';
import appointment from '../controllers/appointment.controller.js';
const router = Router();


// Book Appoinntment
router.post("/book-appointment", appointment.bookAppointment);
router.get("/cancel-appointment/:id", appointment.cancelAppointment);
router.get("/confirm-appointment/:id", appointment.confirmAppointment);
router.get("/completed-appointment/:id", appointment.appointmentCompleted);
router.delete("/delete-appointment/:id", appointment.deleteAppointment);    


export default router;