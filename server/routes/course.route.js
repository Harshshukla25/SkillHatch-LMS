import express from "express";
import userAuth from "../middlewares/auth.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";


const router=express.Router();
router.route("/").post(userAuth,createCourse);
router.route("/search").get(userAuth, searchCourse)
router.route("/published-courses").get(getPublishedCourse)
router.route("/").get(userAuth,getCreatorCourses);
router.route("/:courseId").put(userAuth,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(userAuth,getCourseById);
router.route("/:courseId").delete(userAuth, removeCourse);
router.route("/:courseId/lecture").post(userAuth,createLecture);
router.route("/:courseId/lecture").get(userAuth,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(userAuth,editLecture);
router.route("/lecture/:lectureId").delete(userAuth,removeLecture);
router.route("/lecture/:lectureId").get(userAuth,getLectureById);
router.route("/:courseId").patch(userAuth,togglePublishCourse);

export default router; 