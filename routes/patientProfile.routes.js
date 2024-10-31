import { Router } from "express";
import patient from "../controllers/patientProfile.controller.js";

const router = Router();

router.get("/profile/:id" , patient.profile);
router.put("/update-profile/:id", patient.updateProfile);
router.delete("/delete-profile/:id", patient.deleteProfile);

export default router;
