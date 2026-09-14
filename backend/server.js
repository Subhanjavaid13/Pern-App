import express, { json } from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoute from "./routes/productRoute.js"
import { sql } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/products",productRoute);

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(20,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Database COnnected successfully 🎉")
    } catch (error) {
        console.log("Error in connecting with DB",error);
    }
    
}

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("App Is Running on port "+ PORT);
    })
})