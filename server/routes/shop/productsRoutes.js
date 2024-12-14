import express from "express";
import {
  filteredProducts,
  product,
} from "../../controllers/shop/productsController.js";

const router = express.Router();

router.get("/", filteredProducts);
router.get("/:id", product);

export default router;
