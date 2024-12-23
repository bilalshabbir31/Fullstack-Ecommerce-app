import express from "express";
import {
  allUserOrders,
  checkoutSuccess,
  createCheckoutSession,
  getOrder,
} from "../../controllers/shop/orderController.js";
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);
router.get("/list/:userId", allUserOrders);
router.get("/:id", getOrder);

export default router;
