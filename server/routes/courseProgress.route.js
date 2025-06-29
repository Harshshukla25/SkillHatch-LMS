import express from "express"
import userAuth from "../middlewares/auth.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router= express.Router();

router.route("/:courseId").get(userAuth,getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(userAuth,updateLectureProgress);
router.route("/:courseId/complete").post(userAuth, markAsCompleted)
router.route("/:courseId/incomplete").post(userAuth, markAsInCompleted);

export default router;