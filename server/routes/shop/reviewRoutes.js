import express from "express";
import {
  addProductReview,
  fetchProductReviews,
} from "../../controllers/shop/productReviewController.js";

const router = express.Router();

router.post("/", addProductReview);
router.get("/:productId", fetchProductReviews);

export default router;
