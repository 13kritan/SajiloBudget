// models/Expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }, // e.g., "eSewa", "Cash"
    expenseType: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Expense", expenseSchema);
