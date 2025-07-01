// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload= multer({storage});
// export default upload;

// utils/multer.js
import multer from "multer";

const storage = multer.memoryStorage();

// Optional: Limit file size and restrict to videos only
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "video/mkv"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only video files are allowed!"));
    }
    cb(null, true);
  },
});

export default upload;
