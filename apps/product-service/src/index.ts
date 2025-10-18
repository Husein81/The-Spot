import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors({
    origin:["http://localhost:3000", "http://localhost:3001"],
    credentials:true
}));




const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Product server is running on port ${PORT}`)
);
