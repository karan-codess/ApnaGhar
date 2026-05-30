import cloudinary from "../config/cloudinary.js";
import streamfier from "streamifier";

export const uploadToCloudinary=(buffer,folder ="general")=>{
    return new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder}
            ,(error,result)=>{
                if(result){
                    resolve(result)
                }
                else reject(error);
            }
        )
        steamfier.createReadStream(buffer).pipe(stream);
    })
}