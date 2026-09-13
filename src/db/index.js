import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

async function connectDB() {
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MoongoDB Connected: DB Host: ${connection.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed",error);
        // proces.exit(1) stops the program,(1) tells it stops due to error in the code
        process.exit(1);
    }
}

export default connectDB;