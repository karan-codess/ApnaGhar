import express from "express";
import { addProperty, deleteProperty, getAllProperties, getMyProperties, getPropertyCounts, getPropertyDetails, getSellerDashboard, updateProperty, updatePropertyStatus } from "../controllers/propertycontroller.js";
import {protect,authorize} from "../middlewares/authmiddleware.js";
import upload from "../middlewares/uploadmiddleware.js";


const propertyRouter = express.Router();



propertyRouter.get("/",getAllProperties);
propertyRouter.post("/",protect ,authorize("seller"),upload.array("images",10),addProperty);
propertyRouter.get("/my",protect,authorize("seller"),getMyProperties);
propertyRouter.put("/:id",protect,authorize("seller"),upload.array("images",10),updateProperty);
propertyRouter.delete("/:id",protect,authorize("seller"),deleteProperty);
propertyRouter.patch("/:id/status",protect,authorize("seller"),updatePropertyStatus);
propertyRouter.get("/counts",getPropertyCounts);
propertyRouter.get("/:id",getPropertyDetails);
propertyRouter.get("/seller/dashboard",protect,authorize("seller"),getSellerDashboard);



export default propertyRouter;