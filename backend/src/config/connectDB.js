import mongoose  from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/expense";


export async function connectDB(){

    try {
        console.log("Mongodb Connecting...");
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb Connected..");
    } catch (error) {
        console.log("Error While connecting DB",error.message);
    }
}