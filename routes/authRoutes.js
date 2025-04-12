import express from "express";
import { userSignup, signin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", signin);

export default router;
