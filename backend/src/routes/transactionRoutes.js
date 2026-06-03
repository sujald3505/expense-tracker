import { Router } from "express";

import {
  getTransactions,
  createTransaction,
  deleteTransactions,
  getAllTransactions,
  downloadTransactionPDF,
} from "../controllers/transaction.controller.js";

import { getInsights } from "../controllers/insight.controller.js";

import { authenticate } from "../middleware/authenticate.js";

const transactionRoute = Router();

// ============================
// GET USER TRANSACTIONS
// ============================

transactionRoute.get("/", authenticate, getTransactions);

// ============================
// GET ALL TRANSACTIONS (ADMIN)
// ============================

transactionRoute.get("/all", authenticate, getAllTransactions);

// ============================
// AI INSIGHTS
// ============================

transactionRoute.get("/insights", authenticate, getInsights);

// ============================
// DOWNLOAD PDF
// ============================

transactionRoute.get("/download/pdf", authenticate, downloadTransactionPDF);

// ============================
// CREATE TRANSACTION
// ============================

transactionRoute.post("/", authenticate, createTransaction);

// ============================
// DELETE TRANSACTION
// ============================

transactionRoute.delete("/:id", authenticate, deleteTransactions);

export default transactionRoute;
