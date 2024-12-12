import express from "express";
import { filteredProducts } from "../../controllers/shop/productsController.js";

const router = express.Router();

router.get('/', filteredProducts)

export default router;
