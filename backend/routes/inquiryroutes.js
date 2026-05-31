import express from 'express';
import { getSellerInquiries, markAsRead, sendInquiry } from '../controllers/inquirycontroller.js';
import { authorize, protect } from '../middlewares/authmiddleware.js';


const inquiryRouter=express.Router();


inquiryRouter.post("/", protect,authorize("buyer"),sendInquiry);
inquiryRouter.get("/seller", protect,authorize("seller"),getSellerInquiries);

inquiryRouter.patch("/:id/read", protect,markAsRead);

export default inquiryRouter;