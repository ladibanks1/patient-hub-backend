import { Router } from "express";
import logout from "../controllers/auth/logout.controller.js";
import { isAuth } from "../controllers/auth/logout.controller.js";

const router = Router();


// Check if Authenticated
router.get("/isAuth" , isAuth)

// Logout Route
router.get("/logout", logout);

export default router;
