import express from "express";
import userAuth from "../middlewares/auth.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router=express.Router();

router.route("/checkout/create-checkout-session").post(userAuth,createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(userAuth,getCourseDetailWithPurchaseStatus);

router.route("/").get(userAuth,getAllPurchasedCourse);

export default router