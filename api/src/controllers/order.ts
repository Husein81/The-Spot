import { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import NotFoundError from "../error/not-found.js";

const createOrder = async (req: Request, res: Response) => {
  const { userId, orderItems, totalAmount, shippingAddress } = req.body;
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        orderItems,
        totalAmount,
        shippingAddress,
      },
      include: {
        user: true,
        orderItems: true,
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrders = async (req: Request, res: Response) => {
  const { userId, page = "1", limit = "10" } = req.query;
  const pageNumber = parseInt(page as string);
  const pageSize = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageSize;

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: userId ? String(userId) : undefined },
        skip,
        take: pageSize,
        include: {
          user: true,
          orderItems: true,
        },
      }),
      prisma.order.count({
        where: { userId: userId ? String(userId) : undefined },
      }),
    ]);

    res.status(200).json({
      data: orders,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getOrderByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        orderItems: true,
      },
    });

    if (orders.length === 0) {
      throw new NotFoundError("No orders found for this user");
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        orderItems: true,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.delete({
      where: { id },
    });

    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

export {
  createOrder,
  getOrders,
  getOrderByUserId,
  updateOrderStatus,
  deleteOrder,
};
