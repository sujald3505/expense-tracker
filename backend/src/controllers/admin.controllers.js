import { User } from "../models/user.model.js";

import { Transaction } from "../models/transaction.model.js";

export const getAdminDashboard =
  async (req, res) => {

    try {

      // TOTAL USERS
      const totalUsers =
        await User.countDocuments();

      // TOTAL TRANSACTIONS
      const totalTransactions =
        await Transaction.countDocuments();

      // ALL TRANSACTIONS
      const transactions =
        await Transaction.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,

        totalUsers,

        totalTransactions,

        transactions,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };