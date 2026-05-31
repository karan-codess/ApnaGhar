import Wishlist from "../models/wishlistmodel.js";


export const addWishlist=async(req,res)=>{
    try{
        const propertyId=req.body.propertyId;
        const existing=await Wishlist.findOne({
            user:req.user._id,
            property:propertyId
        });
        if(existing){
            return res.status(400).json({message:"Property already in wishlist"});
        }

        await Wishlist.create({
            user:req.user._id,
            property:propertyId
        });
        res.status(200).json({
            success:true,
            message:"Property added to wishlist"});
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



export const getWishlist=async(req,res)=>{
    try{
        const data=await Wishlist.find({
            user:req.user._id
        }).populate("property");
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const removeWishlist=async(req,res)=>{
    try{
        const propertyId=req.params.propertyId;
        const result=await Wishlist.findOneAndDelete({
            user:req.user._id,
            property:propertyId
        });

        if(!result){
            return res.status(404).json({
                success:false,
                message:"wishlist item not found"});
        }
        res.status(200).json({
            success:true,
            message:"Property removed from wishlist"
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}