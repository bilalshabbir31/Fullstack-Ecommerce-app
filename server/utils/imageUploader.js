import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new multer.memoryStorage();

async function imageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { imageUpload, upload };
