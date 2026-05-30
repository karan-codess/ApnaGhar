import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";


export const protect=async(req,res,next)=>{
    try {
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token=req.headers.authorization.split(" ")[1];
           
        } 

        if(!token){
            return res.status(401).json({message:"Not authorized, no token",success:false});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");

        if(req.user && req.user.isBlocked){
            return res.status(403).json({message:"Your account has been blocked by admin.",success:false});
        }

        next();
    } catch (err) {
        res.status(401).json({message:"token invalid  or expired",success:false});
    }
}

export const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"You are not authorized to access this route",success:false});
        }
        next();
}
}