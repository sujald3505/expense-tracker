import { Router } from "express";

import {
  getSummaryReport,
  getUserAnalytics,
} from "../controllers/report.controller.js";

import { authenticate } from "../middleware/authenticate.js";

const reportRoute = Router();

// ============================
// USER SUMMARY REPORT
// ============================

reportRoute.get(
  "/summary",
  authenticate,
  getSummaryReport
);

// ============================
// ADMIN ANALYTICS
// ============================

reportRoute.get(
  "/analytics",
  authenticate,
  getUserAnalytics
);

export default reportRoute;