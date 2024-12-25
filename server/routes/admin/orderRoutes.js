import express from "express";
import {
  fetchAllOrders,
  getOrder,
  updateOrderStatus,
} from "../../controllers/admin/orderController.js";
const router = express.Router();

router.get("/", fetchAllOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrderStatus);

export default router;
