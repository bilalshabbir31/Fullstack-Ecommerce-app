import express from "express";
import { fetchAllOrders, getOrder } from "../../controllers/admin/orderController.js";
const router = express.Router();

router.get("/", fetchAllOrders);
router.get("/:id", getOrder);

export default router;
