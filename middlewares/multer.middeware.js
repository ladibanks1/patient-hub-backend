import multer from "multer";
import ErrorMessage from "../utils/errorMessage.js";
import storage from "../config/cloudinary.config.js";

// Upload Middleware Config
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5/* 5mb Limits */,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ErrorMessage("Please upload a valid image file", 400));
    }
    cb(null, true);
  },
});

export default upload.single("picture");