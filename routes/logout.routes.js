import { Router } from "express";
import logout from "../controllers/auth/logout.controller.js";

const router = Router();

// Logout Route
router.get("/logout", logout);

export default router;
