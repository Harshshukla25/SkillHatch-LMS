// import {v2 as cloudinary} from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config({});

// cloudinary.config({
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET,
//     cloud_name:process.env.CLOUD_NAME,
// });
// export const uploadMedia= async(file)=>{
//     try{
// const uploadResponse= await cloudinary.uploader.upload(file,{
//     resource_type:"auto"
// })
// return uploadResponse;
//     }catch(error){
// console.log(error);
//     }
// }
// export const deleteMediaFromCloudinary= async(publicId)=>{
//     try{
// await cloudinary.uploader.destroy(publicId)
//     }catch(error){
// console.log(error);;
//     }
// }

// export const deleteVideoFromCLoudinary=async (publicId)=>{
//     try{
// await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
//     }catch(error){
//         console.log(error)
//     }
// }



// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload buffer (auto-detect image/video)
export const uploadMedia = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Handles both images and videos
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

// Delete media by public ID
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Delete image error:", error);
  }
};

// Specifically delete video
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.error("Delete video error:", error);
  }
};
