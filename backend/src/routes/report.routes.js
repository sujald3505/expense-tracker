import { Router } from "express";
import { route } from "./main.route.js";
import { getSummaryReport } from "../controllers/report.controller.js";




const reportRoute = Router();

reportRoute.get("/",getSummaryReport)

export default reportRoute;