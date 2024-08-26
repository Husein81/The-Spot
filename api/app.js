import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import authRouter from './routes/auth.js';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
//routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user',userRouter);
app.use('/api/order', orderRouter);
app.use(errorHandlerMiddleware);


//use client
app.use(express.static(path.join(__dirname,'client/dist')));
const port = process.env.PORT;

//connection to DB
await connectDB();

app.listen(port,() => console.log(`Server is listing on port ${port}...`));
