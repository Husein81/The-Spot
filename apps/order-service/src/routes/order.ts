import { Order } from "@repo/order-db";
import { OrderChartType } from "@repo/types";
import { startOfMonth, subMonths } from "date-fns";
import { FastifyInstance } from "fastify";
import { isAdmin, protect } from "../middleware/auth";

export const orderRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    "/user-orders",
    { preHandler: protect },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.send(orders);
    }
  );
  fastify.get("/orders", { preHandler: isAdmin }, async (request, reply) => {
    const { page, limit, search } = request.query as {
      page?: number;
      limit?: number;
      search?: string;
    };

    const orders = await Order.find()
      .where("productName")
      .regex(new RegExp(search || "", "i"))
      .skip(((page || 1) - 1) * (limit || 10))
      .limit(limit || 10)
      .sort({ createdAt: -1 });

    return reply.send({
      data: orders,
      totalPages: Math.ceil(orders.length / (limit || 10)),
      currentPage: page || 1,
      totalCount: orders.length,
    });
  });
  fastify.get(
    "/order-chart",
    { preHandler: isAdmin },
    async (request, reply) => {
      const now = new Date();
      const sixMonthsAgo = startOfMonth(subMonths(now, 5));

      // { month: "April", total: 173, successful: 100 }

      const raw = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo, $lte: now },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: { $sum: 1 },
            successful: {
              $sum: {
                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
                // {
                //   "year":2025,
                //   "month":9,
                //   "total":100,
                //   "successful":72
                // }
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
            successful: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const results: OrderChartType[] = [];

      for (let i = 5; i >= 0; i--) {
        const d = subMonths(now, i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;

        const match = raw.find(
          (item) => item.year === year && item.month === month
        );

        results.push({
          month: monthNames[month - 1] as string,
          total: match ? match.total : 0,
          successful: match ? match.successful : 0,
        });
      }

      return reply.send(results);
    }
  );
};
