import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app, server} from './lib/socket.js'
// Route
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server Running in localhost:${PORT}`);
  });
});
