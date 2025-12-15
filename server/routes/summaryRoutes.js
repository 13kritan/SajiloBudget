const express = require("express");
const router = express.Router();
const { getLast10DaysSummary, getDailyAverage } = require("../controllers/summaryController");
const protect = require("../controllers/auth");

// Routes
router.get("/", protect, getLast10DaysSummary);
router.get("/daily-average", protect, getDailyAverage);

module.exports = router;
