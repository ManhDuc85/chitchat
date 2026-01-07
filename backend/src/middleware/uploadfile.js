import multer from "multer"; // New file entirely

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (optional)
  },
});

export default upload;
