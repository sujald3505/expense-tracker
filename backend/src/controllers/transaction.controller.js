// import { Transaction } from "../models/transaction.model.js";

// export const getTransactions = async (req,res)=>{
//     try {
//         const  transactions = await Transaction.find().populate("user","name email").sort({ createdAt: -1});
//         res.status(200).json({success: true,transactions});
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Internal Server Error" });
//     }
// }

// export const deleteTransactions = async(req,res)=>{
//         try {
//             const transactions = await Transaction.findById(req.params.id);
//             if (!transaction) {
//                 return res.status(404).json({
//                     message: "transaction is not found",
//                 });
//             }
//              await transactions.deleteOne();

//              res.status(200).json({success: "Transactions Deleted"});
//         } catch (error) {
//             res.status(500).json({ message: error.message || "Internal Server Error" });
//         }
// }
import { Transaction } from "../models/transaction.model.js";

// GET ALL TRANSACTIONS
export const getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find({

          user: req.userId,
        })

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

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

// CREATE TRANSACTION
export const createTransaction =
  async (req, res) => {

    try {

      const {
        title,
        amount,
        type,
        category,
        date,
      } = req.body;

      const newTransaction =
        await Transaction.create({

          title,

          amount,

          type,

          category,

          date,

          user: req.userId,
        });

      res.status(201).json({

        success: true,

        message:
          "Transaction Added",

        newTransaction,
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };

// DELETE TRANSACTION
export const deleteTransactions =
  async (req, res) => {

    try {

      const transaction =
        await Transaction.findById(
          req.params.id
        );

      if (!transaction) {

        return res
          .status(404)
          .json({

            message:
              "Transaction Not Found",
          });
      }

      await transaction.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Transaction Deleted",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };