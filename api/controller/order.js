import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import Order from "../model/order.js";
import BadRequestError from "../error/bad-request.js";
import NotFoundError from "../error/not-found.js";

//Client
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(StatusCodes.OK).json(orders);
});

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    totalPrice,
    shippingPrice,
    itemsPrice,
  } = req.body;

  if (items && items.length === 0) {
    throw new BadRequestError("No order items");
  }
  const order = new Order({
    items: items.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    shippingPrice,
  });
  const createOrder = await order.save();
  res.status(StatusCodes.CREATED).json(createOrder);
});

export const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  order.paymentStatus = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
  res.status(StatusCodes.OK).json(updatedOrder);
});

// Admin
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize);
  const page = Number(req.query.page) || 1;

  const searchTerm = req.query.searchTerm
    ? { title: { $regex: req.query.searchTerm, $options: "i" } }
    : {};

  const count = await Order.countDocuments(searchTerm);

  const orders = await Order.find(searchTerm)
    .populate("user", "id username")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(StatusCodes.OK).json({
    orders,
    currentPage: page,
    totalCount: count,
    totalPages: Math.ceil(count / pageSize),
  });
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id).populate(
    "user",
    "username email"
  );
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  res.status(StatusCodes.OK).json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  order.orderStatus = true;
  order.deliveredAt = Date.now();

  const updateOrder = await order.save();
  res.status(StatusCodes.OK).json(updateOrder);
});
