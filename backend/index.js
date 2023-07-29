import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.mongoUrl).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log("Couldnot connected to database",err.message);
})

app.listen(8800,()=>{
    console.log("Server is running.")
})