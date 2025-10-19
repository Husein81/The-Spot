import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { productRouter, categoryRouter } from "./routes";
import { main } from "./seed";
import { prisma } from "@repo/product-db";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
const PORT = process.env.PORT;
await main();
await prisma.$disconnect();
app.listen(PORT, () =>
  console.log(`Product server is running on port ${PORT}`)
);
