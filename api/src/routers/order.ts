import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderByUserId,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderByUserId);

router.post("/", createOrder);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
