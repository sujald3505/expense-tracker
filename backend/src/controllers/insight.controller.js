import { Transaction } from "../models/transaction.model.js";

// ============================
// AI EXPENSE INSIGHTS
// ============================

export const getInsights = async (req, res) => {
  try {
    // ============================
    // GET USER TRANSACTIONS
    // ============================

    const transactions = await Transaction.find({
      user: req.userId,
    });

    // ============================
    // TOTALS
    // ============================

    let totalIncome = 0;

    let totalExpense = 0;

    let categoryMap = {};

    transactions.forEach((item) => {
      // INCOME
      if (item.type === "income") {
        totalIncome += item.amount;
      }

      // EXPENSE
      else {
        totalExpense += item.amount;

        // CATEGORY TOTAL
        if (categoryMap[item.category]) {
          categoryMap[item.category] += item.amount;
        } else {
          categoryMap[item.category] = item.amount;
        }
      }
    });

    // ============================
    // FIND HIGHEST CATEGORY
    // ============================

    let highestCategory = "";

    let highestAmount = 0;

    for (const key in categoryMap) {
      if (categoryMap[key] > highestAmount) {
        highestAmount = categoryMap[key];

        highestCategory = key;
      }
    }

    // ============================
    // GENERATE INSIGHTS
    // ============================

    let insights = [];

    // EXPENSE CHECK
    if (totalExpense > totalIncome) {
      insights.push("Your expenses are higher than your income.");
    } else {
      insights.push("Great! Your income is higher than your expenses.");
    }

    // CATEGORY INSIGHT
    if (highestCategory) {
      insights.push(
        `Highest spending category is ${highestCategory} with ₹${highestAmount}.`,
      );
    }

    // SAVINGS
    const savings = totalIncome - totalExpense;

    if (savings > 0) {
      insights.push(`You saved ₹${savings} this period.`);
    } else {
      insights.push("Try reducing unnecessary expenses.");
    }

    // HIGH SPENDING ALERT
    if (highestAmount > 10000) {
      insights.push(`${highestCategory} expenses are very high this month.`);
    }

    // ============================
    // RESPONSE
    // ============================

    res.status(200).json({
      success: true,

      insights,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
