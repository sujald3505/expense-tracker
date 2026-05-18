import { Router } from "express";

import { getSettings, updateSettings } from "../controllers/setting.controller.js";

const settingRoute = Router();

settingRoute.get("/",getSettings)
settingRoute.put("/",updateSettings)

export default settingRoute;