import express from "express";
import { getUserProfile,logout, login,signup, updateProfile } from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.js";
import { uploadImage } from "../utils/multer.js"; // ✅ correct


const router=express.Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(userAuth,getUserProfile)

router.route("/profile/update").put(userAuth, uploadImage.single("profilePhoto"), updateProfile);

export default router;