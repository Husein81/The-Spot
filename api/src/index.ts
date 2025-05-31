// Global imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Local imports
import {
  authRouter,
  categoryRouter,
  orderRouter,
  productRouter,
} from "./routers/index.js";
import prisma from "./utils/prisma.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//routers
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// connection
await prisma.$connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
