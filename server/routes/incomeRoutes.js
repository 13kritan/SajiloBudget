const express = require("express");
const router = express.Router();
const { addIncome, getIncomes } = require("../controllers/incomeController");
const protect = require("../controllers/auth");

// Routes
router.post("/",protect,  addIncome);
router.get("/",protect,  getIncomes);

module.exports = router;
