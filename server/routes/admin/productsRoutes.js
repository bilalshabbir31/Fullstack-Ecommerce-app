import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
  handleImageUpload,
} from "../../controllers/admin/productsController.js";
import { upload } from "../../utils/imageUploader.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/", addProduct);
router.get("/", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
