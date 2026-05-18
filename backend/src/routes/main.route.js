import { Router } from "express";
import userRoute from "./user.route.js"
import transactionRoute from "./transactionRoutes.js";
import categoryRoutes from "./category.routes.js";
import reportRoutes from "./report.routes.js";
import settingRoute from "./setting.route.js";

export const route = Router();



route.use("/user",userRoute)
route.use("/transaction",transactionRoute)
route.use("/category",categoryRoutes)
route.use("/report",reportRoutes)
route.use("/setting",settingRoute)