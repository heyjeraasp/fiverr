import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from 'cookie-parser';
import { gigsRoutes } from './routes/GigsRoutes.js';
import { orderRoutes } from './routes/OrderRoutes.js';
import { messageRoutes } from './routes/MessagesRoutes.js';
import { dashboardRoutes } from './routes/DashboardRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}))

app.use("/uploads/profiles",express.static("uploads/profiles"))
app.use("/uploads",express.static("uploads"))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/gigs",gigsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})

