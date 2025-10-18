import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify();

const port = process.env.PORT;

const start = async () => {
  try {
    await fastify.listen({ port: Number(port) });
    console.log(`Order service running on port ${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
