import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../../controllers/shop/orderController.js";
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);

export default router;
