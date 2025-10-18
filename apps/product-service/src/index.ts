import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { productRouter, categoryRouter } from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Product server is running on port ${PORT}`)
);
