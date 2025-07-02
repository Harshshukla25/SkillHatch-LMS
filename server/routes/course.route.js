// import express from "express";
// import userAuth from "../middlewares/auth.js";
// import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
// import upload from "../utils/multer.js";


// const router=express.Router();
// router.route("/").post(userAuth,createCourse);
// router.route("/search").get(userAuth, searchCourse)
// router.route("/published-courses").get(getPublishedCourse)
// router.route("/").get(userAuth,getCreatorCourses);
// router.route("/:courseId").put(userAuth,upload.single("courseThumbnail"),editCourse);
// router.route("/:courseId").get(userAuth,getCourseById);
// router.route("/:courseId").delete(userAuth, removeCourse);
// router.route("/:courseId/lecture").post(userAuth,createLecture);
// router.route("/:courseId/lecture").get(userAuth,getCourseLecture);
// router.route("/:courseId/lecture/:lectureId").post(userAuth,editLecture);
// router.route("/lecture/:lectureId").delete(userAuth,removeLecture);
// router.route("/lecture/:lectureId").get(userAuth,getLectureById);
// router.route("/:courseId").patch(userAuth,togglePublishCourse);

// export default router; 





import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  getPublishedCourse,
  removeCourse,
  removeLecture,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controller.js";

import { uploadVideo, uploadImage } from "../utils/multer.js";

const router = express.Router();

// 🟢 Create a course with thumbnail (image upload)
router.route("/").post(userAuth, uploadImage.single("courseThumbnail"), createCourse);

// 🔍 Search courses (requires auth)
router.route("/search").get(userAuth, searchCourse);

// 🌐 Get all published courses (public access)
router.route("/published-courses").get(getPublishedCourse);

// 📚 Get all courses created by the logged-in user
router.route("/").get(userAuth, getCreatorCourses);

// ✏️ Edit course (with new thumbnail)
router.route("/:courseId").put(userAuth, uploadImage.single("courseThumbnail"), editCourse);

// 📘 Get course by ID
router.route("/:courseId").get(userAuth, getCourseById);

// ❌ Delete a course
router.route("/:courseId").delete(userAuth, removeCourse);

// 🎥 Create a lecture with video upload
router.route("/:courseId/lecture").post(userAuth, uploadVideo.single("video"), createLecture);

// 📖 Get all lectures for a course
router.route("/:courseId/lecture").get(userAuth, getCourseLecture);

// ✏️ Edit a lecture (can include updated video info)
router.route("/:courseId/lecture/:lectureId").post(userAuth, editLecture);

// ❌ Delete a lecture
router.route("/lecture/:lectureId").delete(userAuth, removeLecture);

// 📄 Get a single lecture by ID
router.route("/lecture/:lectureId").get(userAuth, getLectureById);

// 🚀 Publish/unpublish a course
router.route("/:courseId").patch(userAuth, togglePublishCourse);

export default router;
