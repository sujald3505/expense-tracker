import express from "express"

import cors from "cors"

import { connectDB } from "./config/connectDB.js";
import { route } from "./routes/main.route.js";

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

const PORT = 8080;

app.use("/api",route);

app.listen(PORT,() =>{
    console.log(`server is running at http://localhost:${PORT}`);
})