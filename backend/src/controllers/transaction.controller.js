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

    // TOTALS
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    // CREATE PDF
    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
    });

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

    doc.moveDown(2);

    // TABLE HEADER
    doc
      .fontSize(12)
      .text("Title", 40, 120)
      .text("Amount", 160, 120)
      .text("Type", 250, 120)
      .text("Category", 330, 120)
      .text("Date", 450, 120);

    // HEADER LINE
    doc.moveTo(40, 140).lineTo(560, 140).stroke();

    let y = 160;

    // TRANSACTIONS
    transactions.forEach((item) => {
      const formattedDate = new Date(item.date).toLocaleDateString("en-GB");

      doc
        .fontSize(10)
        .text(item.title, 40, y, {
          width: 100,
        })
        .text(`Rs. ${item.amount}`, 160, y)
        .text(item.type, 250, y)
        .text(item.category, 330, y)
        .text(formattedDate, 450, y);

      y += 25;

      // NEW PAGE
      if (y > 750) {
        doc.addPage();

        y = 50;

        doc
          .fontSize(12)
          .text("Title", 40, y)
          .text("Amount", 160, y)
          .text("Type", 250, y)
          .text("Category", 330, y)
          .text("Date", 450, y);

        y += 30;
      }
    });

    // SUMMARY SECTION

    y += 20;

    doc.moveTo(40, y).lineTo(560, y).stroke();

    y += 20;

    doc.fontSize(14).text(`Total Credit (Income): Rs. ${totalIncome}`, 40, y);

    y += 25;

    doc.fontSize(14).text(`Total Debit (Expense): Rs. ${totalExpense}`, 40, y);

    y += 25;

    doc.fontSize(16).text(`Net Balance: Rs. ${balance}`, 40, y);

    // END PDF
    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
