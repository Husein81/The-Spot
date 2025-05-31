import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderByUserId,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderByUserId);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
