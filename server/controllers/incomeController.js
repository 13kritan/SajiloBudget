const Income = require("../models/IncomeModel");

// Add new income
module.exports.addIncome = async (req, res) => {
  try {
    const { amount, source, note, date } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const income = new Income({
      amount,
      source: source || "eSewa",
      note,
      date: date || Date.now(),
      userId: req.user.id,
    });

    await income.save();

    res.status(201).json({ message: "Income added successfully", income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all income
module.exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
