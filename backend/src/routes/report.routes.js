// import { Router } from "express";

// import {
//   getSummaryReport,
//   getUserAnalytics,
 
 
// } from "../controllers/report.controller.js";

// import { authenticate } from "../middleware/authenticate.js";

// const reportRoutes = Router();

// // SUMMARY
// reportRoutes.get(
//   "/summary",
//   authenticate,
//   getSummaryReport
// );

// // ADMIN ANALYTICS
// reportRoutes.get(
//   "/analytics",
//   authenticate,
//   getUserAnalytics
// );



// export default reportRoutes;


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