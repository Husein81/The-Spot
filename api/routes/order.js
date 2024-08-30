import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../controller/order.js";

const router = express.Router();

router.route("/").post(addOrderItems).get(getOrders);
router.route("/myorder").get(getMyOrders);
router.route("/:id").get(getOrder);
router.route("/:id/pay").put(updateOrderPaymentStatus);
router.route("/:id/delivery").put(updateOrderStatus);

export default router;
