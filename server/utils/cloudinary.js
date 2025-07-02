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


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * ✅ Upload media from buffer (image/video).
 * Automatically detects media type using `resource_type: "auto"`
 */
export const uploadMedia = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * 🧹 Delete any media (image by default)
 */
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary delete image error:", error);
    throw error;
  }
};

/**
 * 🧹 Delete video media specifically
 */
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary delete video error:", error);
    throw error;
  }
};
