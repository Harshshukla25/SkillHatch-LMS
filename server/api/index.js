// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "../database/db.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// // 🧩 Routes
// import userRoute from "../routes/userroutes.js";
// import courseRoute from "../routes/course.route.js";
// import mediaRoute from "../routes/media.route.js";
// import purchaseRoute from "../routes/purchaseCourse.route.js"
// import courseProgressRoute from "../routes/courseProgress.route.js"

// const app = express();
// dotenv.config();

// // ✅ Allowed origins for CORS
// const allowedOrigins = ['http://localhost:5173'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ✅ allow PATCH
// };

// // ✅ Middleware
// app.use(cors(corsOptions));               // Apply CORS options
// // app.options("/*", cors(corsOptions));      // Handle preflight requests
// app.options('/course/:courseId', cors(corsOptions));


// app.use(cookieParser());                  // Parse cookies
// app.use(express.json());                  // Parse JSON bodies


// // ✅ Routes
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running");
// });
// app.use("/media", mediaRoute);
// app.use("/user", userRoute);
// app.use("/course", courseRoute);
// app.use("/purchase",purchaseRoute);
// app.use("/progress",courseProgressRoute);

// // ✅ Start Server
// const PORT = 6060;
// connectDB()
//   .then(() => {
//     console.log("✅ Database connection is established");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is listening at port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Database cannot be connected", err);
//   });


import express from "express";
import dotenv from "dotenv";
import connectDB from "../database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// 🧩 Routes
import userRoute from "../routes/userroutes.js";
import courseRoute from "../routes/course.route.js";
import mediaRoute from "../routes/media.route.js";
import purchaseRoute from "../routes/purchaseCourse.route.js"
import courseProgressRoute from "../routes/courseProgress.route.js"

dotenv.config();

const app = express();

// ✅ CORS Setup
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('/course/:courseId', cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => res.send("🚀 Serverless Express on Vercel"));
app.use("/media", mediaRoute);
app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/purchase", purchaseRoute);
app.use("/progress", courseProgressRoute);

// ✅ Connect to DB (run once)
await connectDB();

// ✅ Export Express as handler (no app.listen)
import { parse } from "url";
export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  app(req, res, parsedUrl);
}
