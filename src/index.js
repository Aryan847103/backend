import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/index.js";

// ye is liye taaki hum import syntax ko use kr sake require(dotenv).config) ki jagh
dotenv.config({
    path:'./env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });