import User from "../models/usermodel.js";
import {uploadToCloudinary} from "../utils/uploadToCloudinary.js";

export const getProfile=async(req,res)=>{
    try{
        const user =await User.findById(req.user._id).select("-password");
        res.status(200).json({
            success:true,user
        })
    }
    catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
}


export const getPublicProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).select("name profilePic role createdAt");
        if(!user){
            return res.status(404).json({message:"User not found",success:false});
        }
        res.status(200).json({success:true,user});
    } catch (err) {
        res.status(500).json({message:err.message,success:false});
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const {name,phone,address,removeProfilePic}=req.body;
        const user=await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message:"User not found",success:false});
        }
        
        if(req.file){
            const result=await uploadToCloudinary(req.file.buffer,"profiles");
            user.profilePic=result.secure_url;

        }else if(removeProfilePic==="true"){
            user.profilePic=null;
        }

        if(name !== undefined) user.name=name;
        if(phone !== undefined) user.phone=phone;
        if(address !== undefined) user.address=address;


        const updatedUser=await user.save();
        res.status(200).json({message:"Profile updated successfully",success:true,user:updatedUser});

    } catch (err) {
        res.status(500).json({message:err.message,success:false});
    }

}