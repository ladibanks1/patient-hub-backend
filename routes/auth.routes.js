import { Router } from "express";
const router = Router();
import signIn from "../controllers/auth/signUp.controller.js";
import login from "../controllers/auth/login.controller.js";

// SignUp Routes
router.post("/register-hospital", signIn.hospitalSignIn);
router.post("/register-patient", signIn.patientSignIn);
router.post("/register-staff", signIn.staffSignIn);

// Login Routes
router.post("/login", login);

export default router;
