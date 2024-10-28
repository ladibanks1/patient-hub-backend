// Import Router from express
import { Router } from "express";
import notFound from "../controllers/notFound.controller.js";

const router = Router();


router.all("*" , notFound)


export default router