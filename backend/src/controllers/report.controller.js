import { Transaction } from "../models/transaction.model.js";

// ============================
// USER SUMMARY REPORT
// ============================

export const getSummaryReport =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find({
          user: req.userId,
        });

      let totalIncome = 0;

      let totalExpense = 0;

      // CATEGORY MAP
      const categoryMap = {};

      transactions.forEach(
        (item) => {

          // INCOME
          if (
            item.type === "income"
          ) {

            totalIncome +=
              item.amount;
          }

          // EXPENSE
          else {

            totalExpense +=
              item.amount;

            // CATEGORY TOTAL
            if (
              categoryMap[
                item.category
              ]
            ) {

              categoryMap[
                item.category
              ] += item.amount;

            } else {

              categoryMap[
                item.category
              ] = item.amount;
            }
          }
        }
      );

      // CATEGORY ARRAY
      const categoryData =
        Object.keys(
          categoryMap
        ).map((key) => ({
          category: key,

          amount:
            categoryMap[key],
        }));

      const balance =
        totalIncome -
        totalExpense;

      res.status(200).json({
        success: true,

        totalIncome,

        totalExpense,

        balance,

        categoryData,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// ============================
// ADMIN ANALYTICS
// ============================

export const getUserAnalytics =
  async (req, res) => {

    try {

      const analytics =
        await Transaction.aggregate([

          {
            $group: {

              _id: "$user",

              totalIncome: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$type",
                        "income",
                      ],
                    },
                    "$amount",
                    0,
                  ],
                },
              },

              totalExpense: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$type",
                        "expense",
                      ],
                    },
                    "$amount",
                    0,
                  ],
                },
              },
            },
          },

          {
            $lookup: {
              from: "users",

              localField: "_id",

              foreignField: "_id",

              as: "user",
            },
          },

          {
            $unwind: "$user",
          },

          {
            $project: {

              name:
                "$user.name",

              email:
                "$user.email",

              totalIncome: 1,

              totalExpense: 1,

              balance: {
                $subtract: [
                  "$totalIncome",
                  "$totalExpense",
                ],
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        analytics,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };