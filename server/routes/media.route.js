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
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.buffer); // ✅ Use buffer
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error in uploading file" });
  }
});

export default router;
