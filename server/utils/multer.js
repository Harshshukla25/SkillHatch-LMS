// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload= multer({storage});
// export default upload;

import multer from "multer";

// Use memoryStorage for Vercel compatibility
const storage = multer.memoryStorage();

// ✅ Multer for videos
export const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "video/mkv"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only video files are allowed!"));
    }
    cb(null, true);
  },
});

// ✅ Multer for images (thumbnails)
export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});
