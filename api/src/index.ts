// Global imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Local imports
import { authRouter, categoryRouter, productRouter } from "./routers/index.js";
import prisma from "./utils/prisma.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//routers
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

// connection
await prisma.connection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
