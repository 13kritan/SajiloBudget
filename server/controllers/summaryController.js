const Expense = require("../models/ExpenseModel");
const Income = require("../models/IncomeModel")
const mongoose = require("mongoose")

// GET /api/summary/last10days
module.exports.getLast10DaysSummary = async (req, res) => {
  try {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 9); // last 10 days range

    const incomes = await Income.find({
      userId: req.user.id,
      date: { $gte: startDate }
    });

    const expenses = await Expense.find({
      userId: req.user.id,
      date: { $gte: startDate }
    });

    let daySummary = {};

    // Initialize 10 days with zero
    for (let i = 0; i < 10; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      const key = d.toISOString().split("T")[0];
      daySummary[key] = { income: 0, expense: 0 };
    }

    incomes.forEach((inc) => {
      const key = inc.date.toISOString().split("T")[0];
      if (daySummary[key]) daySummary[key].income += inc.amount;
    });

    expenses.forEach((exp) => {
      const key = exp.date.toISOString().split("T")[0];
      if (daySummary[key]) daySummary[key].expense += exp.amount;
    });
    res.json(daySummary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getDailyAverage = async (req, res) => {
  const days = Number(req.query.days) || 10;
  const today = new Date();
  try {
    // last 20 days (10 for current, 10 for previous)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days * 2);

    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // split into previous 10 days and last 10 days
    const middle = Math.ceil(expenses.length / 2);
    const previous = expenses.slice(0, middle).map(e => e.total);
    const last = expenses.slice(middle).map(e => e.total);

    const previousAvg = previous.reduce((a, b) => a + b, 0) / (previous.length || 1);
    const lastAvg = last.reduce((a, b) => a + b, 0) / (last.length || 1);

    const percentChange = previousAvg
      ? ((lastAvg - previousAvg) / previousAvg) * 100
      : 0;

    res.json({
      lastAvg: lastAvg.toFixed(2),
      percentChange: percentChange.toFixed(1),
      expenses
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to calculate daily average" });
  }
};
