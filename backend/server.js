import express, { json } from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/test",(req,res)=>{
    console.log(res.getHeaders());
    res.send("Hello From The backend")
})

app.listen(PORT,()=>{
    console.log("App Is Running on port "+ PORT);
})