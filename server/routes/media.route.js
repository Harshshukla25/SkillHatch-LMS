// import express from 'express';
// import upload from '../utils/multer.js'; 
// import { uploadMedia } from '../utils/cloudinary.js';

// const router=express.Router();

// router.route("/upload-video").post(upload.single("file"),async(req,res)=>{
//     try{
// const result=await uploadMedia(req.file.path)
// res.status(200).json({
//     success:true,
//     message:"File uploaded successfully",
//     data:result
// });
//     }catch(error){
// console.log(error);
// res.status(500).json({message:"Error in uploading file"})
//     }
// });
// export default router;

import express from "express";
import { uploadImage, uploadVideo } from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-video", uploadVideo.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadMedia(req.file.buffer); // Buffer to Cloudinary

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
});

export default router;
