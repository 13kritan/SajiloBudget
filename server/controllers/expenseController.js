// controllers/expenseController.js
const Expense = require("../models/ExpenseModel");
const mongoose = require("mongoose");

// Add Expense
module.exports.addExpense = async (req, res) => {
  const { amount, type, expenseType, note, date } = req.body;

  if (!amount || !type) {
    return res.status(400).json({ message: "Amount and type are required" });
  }

  try {
    const expense = new Expense({
      amount,
      type,
      expenseType,
      note,
      date: date ? new Date(date) : new Date(),
      userId: req.user.id
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// Total expense overall
module.exports.getTotalExpense = async (req, res) => {
  try {
    const expenses = awaitExpense.find({ userId: req.user.id }).sort({ date: -1 });
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(total)
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Total expense by type
module.exports.getExpenseByType = async (req, res) => {
  try {
    const type = req.params.type; // e.g., "eSewa"
    const expenses = await Expense.find({ userId: req.user.id, type });
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    res.json({ type, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Expense breakdown by type (grouped)
module.exports.getGroupedExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    const grouped = expenses.reduce((acc, exp) => {
      if (!acc[exp.type]) acc[exp.type] = 0;
      acc[exp.type] += exp.amount;
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all expense tags
module.exports.getExpenseTags = async (req, res) => {
  try {
    const tags = await Expense.find({ userId: req.user.id }).sort({ name: 1 }); // sorted alphabetically
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expense tags" });
  }
};

// Expense by category
module.exports.getExpensesSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } }, // filter by user
      {
        $group: {
          _id: "$expenseType",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(summary); // [{ _id: "Food & Drinks", total: 500 }, ...]
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expense summary" });
  }
};







