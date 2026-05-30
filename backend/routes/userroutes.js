import express from "express";
import {protect} from "../middlewares/authmiddleware.js";
import { getProfile, getPublicProfile, updateProfile } from "../controllers/usercontroller.js";
import upload from "../middlewares/uploadmiddleware.js";

const userRouter=express.Router();

userRouter.get("/profile",protect,getProfile);
userRouter.put("/profile",protect,upload.single("profilePic"),updateProfile);
userRouter.get("/public/:id",getPublicProfile);

export default userRouter;
