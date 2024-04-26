import express from 'express';
import {connectDB} from "./db.js";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes.js";
import cors from 'cors';
dotenv.config();
const app=express();
const port=process.env.port;

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests only from this origin
  }));
app.use("/", userRoute);


connectDB();

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
})