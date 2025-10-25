import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { sessionRouter } from "./router/session.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const port = process.env.PORT || 5003;

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    });

    fastify.register(sessionRouter, { prefix: "/payment" });

    await fastify.listen({ port: Number(port), host: "0.0.0.0" });
    console.log(`Payment service running on port ${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
