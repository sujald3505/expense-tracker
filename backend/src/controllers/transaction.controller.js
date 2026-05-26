// import { Transaction } from "../models/transaction.model.js";
// import PDFDocument from "pdfkit";

// // ============================
// // CREATE TRANSACTION
// // ============================

// export const createTransaction = async (req, res) => {
//   try {
//     const { title, amount, type, category, date } = req.body;

//     const transaction = await Transaction.create({
//       title,
//       amount,
//       type,
//       category,
//       date,

//       // SAVE USER ID
//       user: req.userId,
//     });

//     res.status(201).json({
//       success: true,

//       message: "Transaction Added Successfully",

//       transaction,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// // ============================
// // GET USER TRANSACTIONS
// // ============================

// export const getTransactions = async (req, res) => {
//   try {
//     const { search, type, category } = req.query;

//     // FILTER OBJECT
//     let filter = {
//       user: req.userId,
//     };

//     // SEARCH FILTER
//     if (search) {
//       filter.title = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     // TYPE FILTER
//     if (type && type !== "all") {
//       filter.type = type;
//     }

//     // CATEGORY FILTER
//     if (category && category !== "all") {
//       filter.category = category;
//     }

//     const transactions = await Transaction.find(filter)

//       .populate("user", "name email")

//       .sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,

//       transactions,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// // ============================
// // GET ALL TRANSACTIONS (ADMIN)
// // ============================

// export const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find()

//       .populate("user", "name email profileImage")

//       .sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,

//       transactions,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// // ============================
// // DELETE TRANSACTION
// // ============================

// export const deleteTransactions = async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({
//         success: false,

//         message: "Transaction Not Found",
//       });
//     }

//     await transaction.deleteOne();

//     res.status(200).json({
//       success: true,

//       message: "Transaction Deleted Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,

//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// // ============================
// // DOWNLOAD PDF REPORT
// // ============================

// export const downloadTransactionPDF = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({
//       user: req.userId,
//     }).sort({
//       createdAt: -1,
//     });

//     // CREATE PDF
//     const doc = new PDFDocument();

//     // RESPONSE HEADERS
//     res.setHeader("Content-Type", "application/pdf");

//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=transactions.pdf",
//     );

//     // PIPE PDF
//     doc.pipe(res);

//     // TITLE
//     doc.fontSize(22).text("Expense Tracker Report", {
//       align: "center",
//     });

//     doc.moveDown();

//     // TABLE HEADER
//     doc
//       .fontSize(14)
//       .text("Title", 50, 120)
//       .text("Amount", 200, 120)
//       .text("Type", 300, 120)
//       .text("Category", 380, 120);

//     let y = 150;

//     // TRANSACTIONS
//     transactions.forEach((item) => {
//       doc
//         .fontSize(12)
//         .text(item.title, 50, y)
//         .text(`Rs. ${item.amount}`, 200, y)
//         .text(item.type, 300, y)
//         .text(item.category, 380, y);

//       y += 30;
//     });

//     // END PDF
//     doc.end();
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import { Transaction } from "../models/transaction.model.js";
import PDFDocument from "pdfkit";

// ============================
// CREATE TRANSACTION
// ============================

export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,

      // SAVE USER ID
      user: req.userId,
    });

    res.status(201).json({
      success: true,

      message: "Transaction Added Successfully",

      transaction,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message || "Internal Server Error",
    });
  }
};

// ============================
// GET USER TRANSACTIONS
// ============================

export const getTransactions = async (req, res) => {
  try {
    const { search, type, category, period } = req.query;

    // ============================
    // FILTER OBJECT
    // ============================

    let filter = {
      user: req.userId,
    };

    // ============================
    // SEARCH FILTER
    // ============================

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // ============================
    // TYPE FILTER
    // ============================

    if (type && type !== "all") {
      filter.type = type;
    }

    // ============================
    // CATEGORY FILTER
    // ============================

    if (category && category !== "all") {
      filter.category = category;
    }

    // ============================
    // PERIOD FILTER
    // ============================

    if (period && period !== "all") {
      const now = new Date();

      // THIS MONTH
      if (period === "month") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        filter.date = {
          $gte: firstDay,
          $lte: lastDay,
        };
      }

      // LAST MONTH
      if (period === "lastmonth") {
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);

        filter.date = {
          $gte: firstDay,
          $lte: lastDay,
        };
      }

      // THIS YEAR
      if (period === "year") {
        const firstDay = new Date(now.getFullYear(), 0, 1);

        const lastDay = new Date(now.getFullYear(), 11, 31);

        filter.date = {
          $gte: firstDay,
          $lte: lastDay,
        };
      }
    }

    // ============================
    // GET TRANSACTIONS
    // ============================

    const transactions = await Transaction.find(filter)

      .populate("user", "name email")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      transactions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message || "Internal Server Error",
    });
  }
};

// ============================
// GET ALL TRANSACTIONS (ADMIN)
// ============================

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()

      .populate("user", "name email profileImage")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      transactions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message || "Internal Server Error",
    });
  }
};

// ============================
// DELETE TRANSACTION
// ============================

export const deleteTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,

        message: "Transaction Not Found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,

      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message || "Internal Server Error",
    });
  }
};

// ============================
// DOWNLOAD PDF REPORT
// ============================

export const downloadTransactionPDF = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    // CREATE PDF
    const doc = new PDFDocument();

    // RESPONSE HEADERS
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transactions.pdf",
    );

    // PIPE PDF
    doc.pipe(res);

    // TITLE
    doc.fontSize(22).text("Expense Tracker Report", {
      align: "center",
    });

    doc.moveDown();

    // TABLE HEADER
    doc
      .fontSize(14)
      .text("Title", 50, 120)
      .text("Amount", 200, 120)
      .text("Type", 300, 120)
      .text("Category", 380, 120);

    let y = 150;

    // TRANSACTIONS
    transactions.forEach((item) => {
      doc
        .fontSize(12)
        .text(item.title, 50, y)
        .text(`Rs. ${item.amount}`, 200, y)
        .text(item.type, 300, y)
        .text(item.category, 380, y);

      y += 30;
    });

    // END PDF
    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
