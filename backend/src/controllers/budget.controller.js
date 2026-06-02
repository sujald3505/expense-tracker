import { Budget } from "../models/budget.model.js";

import { Transaction } from "../models/transaction.model.js";

// ============================
// CREATE BUDGET
// ============================

export const createBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;

    const year = currentDate.getFullYear();

    // CHECK EXISTING BUDGET

    const existingBudget = await Budget.findOne({
      user: req.userId,
      category,
      month,
      year,
    });

    if (existingBudget) {
      return res.status(400).json({
        success: false,

        message: "Budget already exists for this category",
      });
    }

    // CREATE

    const budget = await Budget.create({
      user: req.userId,
      category,
      amount,
      month,
      year,
    });

    res.status(201).json({
      success: true,

      message: "Budget Created Successfully",

      budget,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ============================
// GET BUDGETS
// ============================

export const getBudgets = async (req, res) => {
  try {
    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;

    const year = currentDate.getFullYear();

    // CURRENT MONTH DATE RANGE

    const startDate = new Date(
      year,
      month - 1,
      1
    );

    const endDate = new Date(
      year,
      month,
      1
    );

    // GET BUDGETS

    const budgets = await Budget.find({
      user: req.userId,
      month,
      year,
    });

    // ADD SPENT + REMAINING

    const budgetData = await Promise.all(
      budgets.map(async (budget) => {
        const transactions =
          await Transaction.find({
            user: req.userId,

            category: budget.category,

            type: "expense",

            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          });

        let spent = 0;

        transactions.forEach((item) => {
          spent += item.amount;
        });

        return {
          ...budget._doc,

          spent,

          remaining:
            budget.amount - spent,
        };
      })
    );

    res.status(200).json({
      success: true,

      budgets: budgetData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ============================
// DELETE BUDGET
// ============================

export const deleteBudget = async (req, res) => {
  try {
    const budget =
      await Budget.findById(
        req.params.id
      );

    if (!budget) {
      return res.status(404).json({
        success: false,

        message: "Budget Not Found",
      });
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,

      message:
        "Budget Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};