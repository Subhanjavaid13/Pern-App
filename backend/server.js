import express, { json } from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoute from "./routes/productRoute.js"
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//apply arcjet rate limiter to all routes

app.use(async (req,res,next) => {
    try {
    const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 tokens from the bucket

    if (decision.isDenied()) {
    // console.log("Arcjet denied request:", decision.reason);
    if (decision.reason.isRateLimit()) {
      res.status(429).json({error:"Too many requests"});
    } else if (decision.reason.isBot()) {
      res.status(403).json({ error: "No bots allowed" });
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
    return;
    }
    if( decision.results.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
        res.status(403).json({error:"Spoofed bot is detected"});
        return;
    }
    next();
    } catch (error) {
        console.log("error in arcjet :", error);
        next(error);
    }  
})


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