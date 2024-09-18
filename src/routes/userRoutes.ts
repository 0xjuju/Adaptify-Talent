
import { createUser } from "../controllers/userControllers.js";
import { sanitizeAndValidateUser } from "../middlewares/userValidation.js";
import express from "express";


const router = express.Router();
router.post("/", sanitizeAndValidateUser, createUser);

export default router;


