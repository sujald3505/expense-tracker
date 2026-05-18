import { Router } from "express";
import { deleteTransactions, getTransactions } from "../controllers/transaction.controller.js";

const transactionRoute = Router();

transactionRoute.get("/",getTransactions)
transactionRoute.delete("/:id",deleteTransactions)


export default transactionRoute;

