import express from "express";
import {
  addItemToCart,
  deleteCartItems,
  fetchCartItems,
  updateCartItems,
} from "../../controllers/shop/cartController.js";

const router = express.Router();

router.post("/", addItemToCart);
router.get("/:userId", fetchCartItems);
router.put("/", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);

export default router;
