import express from "express";
import { handleImageUpload } from "../../controllers/admin/productsController.js";
import { upload } from "../../utils/imageUploader.js";

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload)

export default router;
