import express from "express";  
const router = express.Router();
import { registerUser, loginUser, logoutUser,verifyOtp } from "../controller/auth.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js";

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout", logoutUser);
router.post('/verify-otp', verifyOtp);

export default router;