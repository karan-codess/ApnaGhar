import Inquiry from "../models/inquirymodel.js";
import Property from "../models/propertymodel.js";



export const sendInquiry=async(req,res)=>{
    try{
        const {propertyId,message}=req.body;
        const property=await Property.findById(propertyId).populate("seller");


        if(!property){
            return res.status(404).json({
                success:false,
                message:"property not found"});
        }

        const inquiry =await Inquiry.create({
            property:propertyId,
            buyer:req.user._id,
            seller:property.seller._id,
            message
        })

        res.status(200).json({
            success:true,
            message:"inquiry sent successfully",
            inquiry
        });

        
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
}



export const getSellerInquiries=async(req,res)=>{
    try{
        const inquiries=await Inquiry.find({
            seller:req.user._id
        })
        .populate("buyer","name email phone")
        .populate("property","title price images city")
        .sort({createdAt:-1});

        res.status(200).json({
            success:true,
            count:inquiries.length,
            inquiries
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


export const markAsRead=async(req,res)=>{
    try{
        const inquiry=await Inquiry.findById(req.params.id);

        if(!inquiry){
            return res.status(404).json({
                success:false,
                message:"inquiry not found"
            });
        }
        inquiry.isRead=true;
        await inquiry.save();

        res.status(200).json({
            success:true,
            message:"marked as read"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}