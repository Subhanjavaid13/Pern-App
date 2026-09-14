import express, { json } from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoute from "./routes/productRoute.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/products",productRoute);

app.listen(PORT,()=>{
    console.log("App Is Running on port "+ PORT);
})