import "dotenv/config";
import express, { Request, Response } from "express";

import cors from "cors";

import { db } from "./prisma/db.ts";
import my_router from "../routes/user.routes.ts";

const app = express();

const port = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cors({
origin: process.env.FRONTEND_URL,
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


// router
app.use( "/user" , my_router) ;



app.get("/", (req: Request, res: Response) => {
    res.send("Backend is running on this server!");
});


const startserver = async () => {

    try {
        
        await db.connect();
        
        app.listen(port, "0.0.0.0", async () => {
            console.log(`Backend server is running on port ${port} \n DataBase Connected Successfully..`);
        });
        
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

startserver();