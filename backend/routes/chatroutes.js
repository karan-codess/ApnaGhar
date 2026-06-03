import express from "express";
import Chat from '../models/chatmodel.js'
import { protect } from "../middlewares/authmiddleware.js";

const chatRouter=express.Router()
chatRouter.use(protect)


chatRouter.post("/start",async(req,res)=>{
    try {
        const {propertyId,sellerId,buyerId:provideBuyerId}=req.body;
        let buyerId,finalSellerId;
        if(req.user.role==="seller"){
            buyerId=provideBuyerId
            finalSellerId=req.user._id
        }else{
            buyerId=req.user._id
            finalSellerId:sellerId
        }

        if(!buyerId ||finalSellerId){
            return res.status(400).json({
                message:"missing buyer or seller id"
            })
        }

        let chat = await Chat.findOne({
            buyer:buyerId,
            seller:finalSellerId
        })

        if(!chat){
            chat=await Chat.create({
                property:propertyId,
                buyer:buyerId,
                seller:finalSellerId,
                message:[]
            })
        }

        chat = await Chat.findById(chat._id)
        .populate("buyer","name email profilePic")
        .populate("seller","name email profilePic")
        .populate("property","title price images")

        res.json(chat)

    } catch (err) {
        res.status(500).json({
            message:"error creating chat or getting previous one",
            error:error.message
        })
    }
})


chatRouter.post("/send",async (req,res)=>{
    try {
        const {chatId,text,image}=req.body;
        const userId =req.user.id

        const chat=await Chat.findById(chatId)
        if(!chat) return res.status(404).json({
            message:"chat not found"
        })
        if(chat.buyer.toString() !==userId && chat.seller.toString() !==userId){
            return res.status(403).json({
                message:"not authorised to send messages in this chat"
            })
        }
        const newMessage={
            sender:userId,
            text,
            image,
            createdAt:new Date()
        }
        chat.messages.push(newMessage)
        await chat.save();

        const savedMessage=chat.messages[chat.messages.length-1];
        res.json({
            chat,newMessage:savedMessage
        })


    } catch (err) {
        res.status(500).json({
            message:"error sending message",
            error:err.message
        })
    }
})


chatRouter.get("/user",async(req,res)=>{
    try {
        const userId=req.user._id
        const chats=await Chat.find({
            $or:[{buyer:userId},{seller:userId}]
        })

        .populate("buyer","name email profilePic")
        .populate("seller","name email profilePic")
        .populate("property","title price images")
        .sort({updatedAt:-1})
        res.json(chats)


    } catch (err) {
        res.status(500).json({
            message:"error fetching user chats",
            error:err.message
        })
    }
})


chatRouter.get("/:chatId",async(req,res)=>{
    try {
        const chat =await Chat.findById(req.params.chatId).populate(
            "message.sender",
            "name profilePic"
        )

        if(!chat) return res.status(404).json({
            message:"chat not found"
        })

        const userId=req.user._id.toString();
        if(chat.buyer.toString() !==userId && chat.seller.toString() !==userId){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        res.json(chat)

    } catch (err) {
        res.status(500).json({
            message:"error fetching chats messages",
            error:err.message
        })
    }
})


chatRouter.delete("/:chatId",async(req,res)=>{
    try {
        const userId=req.user._id
        const chat= await Chat.findById(req.params.chatId)
        if(!chat) return res.status(404).json({
            message:"chat not found"
        })

        if(chat.buyer.toString() !==userId.toString() &&
    chat.seller.toString() !==userId.toString()){
        return res.status(403).json({
            message:"not authorized"
        })
    }

    await Chat.findByIdAndDelete(req.params.chatId)
    res.json({
        message:"chat deleted successfully!!"
    })
    } catch (err) {
        res.status(500).json({
            message:"error fetching user chats",
            error:err.message
        })
    }
})

chatRouter.delete("/:chatId/message/:messageId",async (req,res)=>{
    try {
        const userId=req.user._id
        const chat= await Chat.findById(req.params.chatId)
        if(!chat) return res.status(404).json({
            message:"chat not found"
        })

        const message=chat.messaages.id(req.params.messageId)
        if(!message) return res.status(404).json({
            message:"message not found"
        })

        if(message.sender.toString() !==userId.toString()){
            return res.status(403).json({
                message:"not authorized to delete this message"
            })
        }
        chat.messages.pull(req.params.messageId)
        await chat.save()
        res.json({
            message:"message deleted successfully",chat
        })


    } catch (err) {
        res.status(500).json({
            message:"error in deleting messages",
            error:err.message
        })
    }
})

export default chatRouter