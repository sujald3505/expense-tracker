// import { Router } from "express";
// import { deleteTransactions, getTransactions } from "../controllers/transaction.controller.js";

// const transactionRoute = Router();

// transactionRoute.get("/",getTransactions)
// transactionRoute.delete("/:id",deleteTransactions)


// export default transactionRoute;


import { Router } from "express";

import {

  getTransactions,

  createTransaction,

  deleteTransactions,

} from "../controllers/transaction.controller.js";

import { authenticate } from "../middleware/authenticate.js";

const transactionRoute =
  Router();

// GET ALL
transactionRoute.get(
  "/",

  authenticate,

  getTransactions
);

// CREATE
transactionRoute.post(
  "/",

  authenticate,

  createTransaction
);

// DELETE
transactionRoute.delete(
  "/:id",

  authenticate,

  deleteTransactions
);

export default transactionRoute;