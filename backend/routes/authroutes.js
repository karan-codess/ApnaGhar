import express from "express";
import { forgotPassword, getMe, login, register, resetPassword, verifyEmail } from "../controllers/authcontroller.js";
import { protect } from "../middlewares/authmiddleware.js";
const authRouter=express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/me",protect,getMe)
authRouter.post("/verify-email",verifyEmail);
authRouter.post("/forgot-password",forgotPassword);
authRouter.post("/reset-password/:token",resetPassword);

export default authRouter;