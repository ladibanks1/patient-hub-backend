import { Router } from "express";
import staff from "../controllers/staffProfile.controller.js";

const router = Router();

router.get("/profile/:id" , staff.profile);
router.put("/update-profile/:id", staff.updateProfile);
router.delete("/delete-profile/:id", staff.deleteProfile);

export default router;
