// // // import { Transaction } from "../models/transaction.model.js";

// // // // ============================
// // // // USER SUMMARY REPORT
// // // // ============================

// // // export const getSummaryReport =
// // //   async (req, res) => {

// // //     try {

// // //       const transactions =
// // //         await Transaction.find({
// // //           user: req.user.userId,
// // //         });

// // //       let totalIncome = 0;

// // //       let totalExpense = 0;

// // //       transactions.forEach(
// // //         (item) => {

// // //           if (
// // //             item.type === "income"
// // //           ) {

// // //             totalIncome +=
// // //               item.amount;

// // //           } else {

// // //             totalExpense +=
// // //               item.amount;
// // //           }
// // //         }
// // //       );

// // //       const balance =
// // //         totalIncome -
// // //         totalExpense;

// // //       res.status(200).json({
// // //         success: true,

// // //         totalIncome,

// // //         totalExpense,

// // //         balance,
// // //       });

// // //     } catch (error) {

// // //       res.status(500).json({
// // //         message:
// // //           error.message,
// // //       });
// // //     }
// // //   };

// // // // ============================
// // // // ADMIN ANALYTICS
// // // // ============================

// // // export const getUserAnalytics =
// // //   async (req, res) => {

// // //     try {

// // //       const analytics =
// // //         await Transaction.aggregate([

// // //           {
// // //             $group: {

// // //               _id: "$user",

// // //               totalIncome: {
// // //                 $sum: {
// // //                   $cond: [
// // //                     {
// // //                       $eq: [
// // //                         "$type",
// // //                         "income",
// // //                       ],
// // //                     },
// // //                     "$amount",
// // //                     0,
// // //                   ],
// // //                 },
// // //               },

// // //               totalExpense: {
// // //                 $sum: {
// // //                   $cond: [
// // //                     {
// // //                       $eq: [
// // //                         "$type",
// // //                         "expense",
// // //                       ],
// // //                     },
// // //                     "$amount",
// // //                     0,
// // //                   ],
// // //                 },
// // //               },
// // //             },
// // //           },

// // //           {
// // //             $lookup: {
// // //               from: "users",

// // //               localField: "_id",

// // //               foreignField: "_id",

// // //               as: "user",
// // //             },
// // //           },

// // //           {
// // //             $unwind: "$user",
// // //           },

// // //           {
// // //             $project: {

// // //               name:
// // //                 "$user.name",

// // //               email:
// // //                 "$user.email",

// // //               totalIncome: 1,

// // //               totalExpense: 1,

// // //               balance: {
// // //                 $subtract: [
// // //                   "$totalIncome",
// // //                   "$totalExpense",
// // //                 ],
// // //               },
// // //             },
// // //           },
// // //         ]);

// // //       res.status(200).json({
// // //         success: true,

// // //         analytics,
// // //       });

// // //     } catch (error) {

// // //       res.status(500).json({
// // //         message:
// // //           error.message ||
// // //           "Internal Server Error",
// // //       });
// // //     }
// // //   };

// // import { Transaction } from "../models/transaction.model.js";

// // // ============================
// // // USER SUMMARY REPORT
// // // ============================

// // export const getSummaryReport =
// //   async (req, res) => {

// //     try {

// //       const transactions =
// //         await Transaction.find({
// //           user: req.userId,
// //         });

// //       let totalIncome = 0;

// //       let totalExpense = 0;

// //       transactions.forEach(
// //         (item) => {

// //           if (
// //             item.type === "income"
// //           ) {

// //             totalIncome +=
// //               item.amount;

// //           } else {

// //             totalExpense +=
// //               item.amount;
// //           }
// //         }
// //       );

// //       const balance =
// //         totalIncome -
// //         totalExpense;

// //       res.status(200).json({
// //         success: true,

// //         totalIncome,

// //         totalExpense,

// //         balance,
// //       });

// //     } catch (error) {

// //       res.status(500).json({
// //         message:
// //           error.message,
// //       });
// //     }
// //   };

// // // ============================
// // // ADMIN ANALYTICS
// // // ============================

// // export const getUserAnalytics =
// //   async (req, res) => {

// //     try {

// //       const analytics =
// //         await Transaction.aggregate([

// //           {
// //             $group: {

// //               _id: "$user",

// //               totalIncome: {
// //                 $sum: {
// //                   $cond: [
// //                     {
// //                       $eq: [
// //                         "$type",
// //                         "income",
// //                       ],
// //                     },
// //                     "$amount",
// //                     0,
// //                   ],
// //                 },
// //               },

// //               totalExpense: {
// //                 $sum: {
// //                   $cond: [
// //                     {
// //                       $eq: [
// //                         "$type",
// //                         "expense",
// //                       ],
// //                     },
// //                     "$amount",
// //                     0,
// //                   ],
// //                 },
// //               },
// //             },
// //           },

// //           {
// //             $lookup: {
// //               from: "users",

// //               localField: "_id",

// //               foreignField: "_id",

// //               as: "user",
// //             },
// //           },

// //           {
// //             $unwind: "$user",
// //           },

// //           {
// //             $project: {

// //               name:
// //                 "$user.name",

// //               email:
// //                 "$user.email",

// //               totalIncome: 1,

// //               totalExpense: 1,

// //               balance: {
// //                 $subtract: [
// //                   "$totalIncome",
// //                   "$totalExpense",
// //                 ],
// //               },
// //             },
// //           },
// //         ]);

// //       res.status(200).json({
// //         success: true,

// //         analytics,
// //       });

// //     } catch (error) {

// //       res.status(500).json({
// //         message:
// //           error.message ||
// //           "Internal Server Error",
// //       });
// //     }
// //   };

// // // ============================
// // // CATEGORY WISE PIE CHART
// // // ============================

// // export const getCategoryAnalytics =
// //   async (req, res) => {

// //     try {

// //       const analytics =
// //         await Transaction.aggregate([

// //           {
// //             $match: {
// //               user: req.userId,
// //               type: "expense",
// //             },
// //           },

// //           {
// //             $group: {

// //               _id: "$category",

// //               totalAmount: {
// //                 $sum: "$amount",
// //               },
// //             },
// //           },

// //           {
// //             $project: {

// //               _id: 0,

// //               name: "$_id",

// //               value:
// //                 "$totalAmount",
// //             },
// //           },
// //         ]);

// //       res.status(200).json({
// //         success: true,

// //         analytics,
// //       });

// //     } catch (error) {

// //       res.status(500).json({
// //         message:
// //           error.message ||
// //           "Internal Server Error",
// //       });
// //     }
// //   };
// //   // ============================
// // // MONTHLY REPORT
// // // ============================

// // export const getMonthlyReport =
// //   async (req, res) => {

// //     try {

// //       const report =
// //         await Transaction.aggregate([

// //           {
// //             $match: {
// //               user: req.userId,
// //             },
// //           },

// //           {
// //             $group: {

// //               _id: {
// //                 month: {
// //                   $month: "$date",
// //                 },
// //               },

// //               income: {
// //                 $sum: {
// //                   $cond: [
// //                     {
// //                       $eq: [
// //                         "$type",
// //                         "income",
// //                       ],
// //                     },
// //                     "$amount",
// //                     0,
// //                   ],
// //                 },
// //               },

// //               expense: {
// //                 $sum: {
// //                   $cond: [
// //                     {
// //                       $eq: [
// //                         "$type",
// //                         "expense",
// //                       ],
// //                     },
// //                     "$amount",
// //                     0,
// //                   ],
// //                 },
// //               },
// //             },
// //           },

// //           {
// //             $sort: {
// //               "_id.month": 1,
// //             },
// //           },
// //         ]);

// //       res.status(200).json({
// //         success: true,
// //         report,
// //       });

// //     } catch (error) {

// //       res.status(500).json({
// //         success: false,
// //         message:
// //           error.message,
// //       });
// //     }
// //   };

// import { Transaction } from "../models/transaction.model.js";

// // ============================
// // USER SUMMARY REPORT
// // ============================

// export const getSummaryReport =
//   async (req, res) => {

//     try {

//       const transactions =
//         await Transaction.find({
//           user: req.userId,
//         });

//       let totalIncome = 0;

//       let totalExpense = 0;

//       // CATEGORY DATA
//       const categoryMap = {};

//       transactions.forEach(
//         (item) => {

//           // INCOME
//           if (
//             item.type === "income"
//           ) {

//             totalIncome +=
//               item.amount;

//           }

//           // EXPENSE
//           else {

//             totalExpense +=
//               item.amount;

//             // CATEGORY WISE TOTAL
//             if (
//               categoryMap[
//                 item.category
//               ]
//             ) {

//               categoryMap[
//                 item.category
//               ] += item.amount;

//             } else {

//               categoryMap[
//                 item.category
//               ] = item.amount;
//             }
//           }
//         }
//       );

//       // CONVERT CATEGORY OBJECT TO ARRAY
//       const categoryData =
//         Object.keys(
//           categoryMap
//         ).map((key) => ({
//           category: key,

//           amount:
//             categoryMap[key],
//         }));

//       const balance =
//         totalIncome -
//         totalExpense;

//       res.status(200).json({
//         success: true,

//         totalIncome,

//         totalExpense,

//         balance,

//         categoryData,
//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };

// // ============================
// // ADMIN ANALYTICS
// // ============================

// export const getUserAnalytics =
//   async (req, res) => {

//     try {

//       const analytics =
//         await Transaction.aggregate([

//           {
//             $group: {

//               _id: "$user",

//               totalIncome: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "income",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },

//               totalExpense: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "expense",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },
//             },
//           },

//           {
//             $lookup: {
//               from: "users",

//               localField: "_id",

//               foreignField: "_id",

//               as: "user",
//             },
//           },

//           {
//             $unwind: "$user",
//           },

//           {
//             $project: {

//               name:
//                 "$user.name",

//               email:
//                 "$user.email",

//               totalIncome: 1,

//               totalExpense: 1,

//               balance: {
//                 $subtract: [
//                   "$totalIncome",
//                   "$totalExpense",
//                 ],
//               },
//             },
//           },
//         ]);

//       res.status(200).json({
//         success: true,

//         analytics,
//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message ||
//           "Internal Server Error",
//       });
//     }
//   };

// // ============================
// // MONTHLY REPORT
// // ============================

// export const getMonthlyReport =
//   async (req, res) => {

//     try {

//       const report =
//         await Transaction.aggregate([

//           {
//             $match: {
//               user: req.userId,
//             },
//           },

//           {
//             $group: {

//               _id: {
//                 month: {
//                   $month: "$date",
//                 },
//               },

//               income: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "income",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },

//               expense: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "expense",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },
//             },
//           },

//           {
//             $sort: {
//               "_id.month": 1,
//             },
//           },
//         ]);

//       res.status(200).json({
//         success: true,

//         report,
//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };

// import { Transaction } from "../models/transaction.model.js";

// // ============================
// // USER SUMMARY REPORT
// // ============================

// export const getSummaryReport = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({
//       user: req.userId,
//     });

//     let totalIncome = 0;
//     let totalExpense = 0;

//     transactions.forEach((item) => {
//       if (item.type === "income") {
//         totalIncome += item.amount;
//       } else {
//         totalExpense += item.amount;
//       }
//     });

//     const balance = totalIncome - totalExpense;

//     res.status(200).json({
//       success: true,
//       totalIncome,
//       totalExpense,
//       balance,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ============================
// // ADMIN ANALYTICS
// // ============================

// export const getUserAnalytics = async (req, res) => {
//   try {
//     const analytics = await Transaction.aggregate([
//       {
//         $group: {
//           _id: "$user",

//           totalIncome: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
//             },
//           },

//           totalExpense: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
//             },
//           },
//         },
//       },

//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },

//       {
//         $unwind: "$user",
//       },

//       {
//         $project: {
//           name: "$user.name",
//           email: "$user.email",
//           totalIncome: 1,
//           totalExpense: 1,

//           balance: {
//             $subtract: ["$totalIncome", "$totalExpense"],
//           },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       analytics,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// // ============================
// // CATEGORY ANALYTICS
// // ============================

// export const getCategoryAnalytics = async (req, res) => {
//   try {
//     const analytics = await Transaction.aggregate([
//       {
//         $match: {
//           user: req.userId,
//           type: "expense",
//         },
//       },

//       {
//         $group: {
//           _id: "$category",

//           value: {
//             $sum: "$amount",
//           },
//         },
//       },

//       {
//         $project: {
//           _id: 0,
//           name: "$_id",
//           value: 1,
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       analytics,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ============================
// // MONTHLY REPORT
// // ============================

// export const getMonthlyReport = async (req, res) => {
//   try {
//     const report = await Transaction.aggregate([
//       {
//         $match: {
//           user: req.userId,
//         },
//       },

//       {
//         $group: {
//           _id: {
//             month: {
//               $month: "$date",
//             },
//           },

//           income: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
//             },
//           },

//           expense: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
//             },
//           },
//         },
//       },

//       {
//         $sort: {
//           "_id.month": 1,
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       report,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// import { Transaction } from "../models/transaction.model.js";

// // ============================
// // USER SUMMARY REPORT
// // ============================

// export const getSummaryReport =
//   async (req, res) => {

//     try {

//       const transactions =
//         await Transaction.find({
//           user: req.userId,
//         });

//       let totalIncome = 0;
//       let totalExpense = 0;

//       transactions.forEach(
//         (item) => {

//           if (
//             item.type === "income"
//           ) {

//             totalIncome +=
//               item.amount;

//           } else {

//             totalExpense +=
//               item.amount;
//           }
//         }
//       );

//       const balance =
//         totalIncome -
//         totalExpense;

//       res.status(200).json({
//         success: true,
//         totalIncome,
//         totalExpense,
//         balance,
//       });

//     } catch (error) {

//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   };

// // ============================
// // ADMIN ANALYTICS
// // ============================

// export const getUserAnalytics =
//   async (req, res) => {

//     try {

//       const analytics =
//         await Transaction.aggregate([

//           {
//             $group: {

//               _id: "$user",

//               totalIncome: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "income",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },

//               totalExpense: {
//                 $sum: {
//                   $cond: [
//                     {
//                       $eq: [
//                         "$type",
//                         "expense",
//                       ],
//                     },
//                     "$amount",
//                     0,
//                   ],
//                 },
//               },
//             },
//           },

//           {
//             $lookup: {
//               from: "users",
//               localField: "_id",
//               foreignField: "_id",
//               as: "user",
//             },
//           },

//           {
//             $unwind: "$user",
//           },

//           {
//             $project: {

//               name:
//                 "$user.name",

//               email:
//                 "$user.email",

//               totalIncome: 1,

//               totalExpense: 1,

//               balance: {
//                 $subtract: [
//                   "$totalIncome",
//                   "$totalExpense",
//                 ],
//               },
//             },
//           },
//         ]);

//       res.status(200).json({
//         success: true,
//         analytics,
//       });

//     } catch (error) {

//       res.status(500).json({
//         message:
//           error.message ||
//           "Internal Server Error",
//       });
//     }
//   };















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