import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
  fetchAllOrdersByUserId,
  getOrder,
} from "../../controllers/shop/orderController.js";
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);
router.get("/list/:userId", fetchAllOrdersByUserId);
router.get("/:id", getOrder);

export default router;
