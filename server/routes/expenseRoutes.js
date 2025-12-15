// routes/expenseRoutes.js
const express = require("express");
const router = express.Router();
const {
  addExpense,
  getTotalExpense,
  getExpenseByType,
  getGroupedExpenses,
  getExpenseTags,
  getExpensesSummary
} = require("../controllers/expenseController");

const protect = require("../controllers/auth");

// Routes
router.post("/", protect, addExpense);
router.get("/", protect, getExpenseTags);
router.get("/total", protect, getTotalExpense);
router.get("/type/:type", protect, getExpenseByType);
router.get("/grouped", protect, getGroupedExpenses);
router.get("/summary", protect, getExpensesSummary);

module.exports = router;
