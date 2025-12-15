const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    default: "eSewa",
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
});

module.exports = mongoose.model("Income", incomeSchema);
