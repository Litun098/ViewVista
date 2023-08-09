import express from "express";

import dotenv from "dotenv";

import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connected to database", err.message);
  });
app.use(express.json());
app.use(cookieParser());  
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(8800, () => {
  console.log("Server is running.");
});
