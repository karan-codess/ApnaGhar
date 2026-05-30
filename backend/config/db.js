import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ksy70a_db_user:717273@cluster0.ziwkr0l.mongodb.net/RealEstate")
    .then(() => {
        console.log("Connected to MongoDB");
    })
 }
