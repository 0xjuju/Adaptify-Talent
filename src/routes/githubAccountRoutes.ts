import { createGithubAccount } from "../controllers/githubAccountController.js";
import express from "express";

const router = express.Router();
router.post("/", createGithubAccount);

export default router;




