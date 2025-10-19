import Fastify from "fastify";
import dotenv from "dotenv";
import { connectOrderDB } from "@repo/order-db";
import { clerkPlugin } from "@clerk/fastify";

dotenv.config();

const fastify = Fastify();

fastify.register(clerkPlugin);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectOrderDB();
    await fastify.listen({ port: Number(port) });
    console.log(`Order service running on port ${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
