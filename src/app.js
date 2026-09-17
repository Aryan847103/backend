import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

//mera data kaha se aana chahiye wo 'CORS' ensure krta hain
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));

//json data lene ke liye
app.use(express.json({limit:"16kb"}));
//url se data lene ke liye
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//images , videos wagera ke liye public folder use hoga and hum usko fetch kr sakte hain
app.use(express.static("public"));
//browser se cookie lene ke liye
app.use(cookieParser());


//Routes

import userRoute from "./routes/user.routes.js";

app.use("/api/v1/users",userRoute);

export{app};    