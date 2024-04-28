import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import authRouter from './routes/auth.js';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import userRouter from './routes/user.js'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user',userRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT;

//connection to DB
connectDB();

app.listen(port,() => console.log(`Server is listing on port ${port}...`));
