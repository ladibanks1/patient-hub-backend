import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Multer Config
// Cloudinary Config
v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  
  // Cloudinary Strorage
  const storage = new CloudinaryStorage({
    cloudinary: v2,
    params: {
      folder: "Patient_Hub",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });

  export default storage;
  export {v2 as cloudinary}
  