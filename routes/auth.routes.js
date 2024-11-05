import { Router } from "express";
const router = Router();
import signIn from "../controllers/auth/signUp.controller.js";
import login from "../controllers/auth/login.controller.js";
import resetPassword from "../controllers/auth/resetPassword.controller.js";

// SignUp Routes
router.post("/register-hospital", signIn.hospitalSignIn);
router.post("/register-patient", signIn.patientSignIn);
router.post("/register-staff", signIn.staffSignIn);

// Login Routes
router.post("/login", login);
router.post("/forgot-password",  resetPassword.forgetUserPassword);
router.post("/reset-password/:token", resetPassword.resetUserPassword);

export default router;
