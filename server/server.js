// server.js

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://sajilo-budget.vercel.app/",
  "https://sajilobudget.netlify.app",       // live frontend URL (Netlify or Vercel)
  "https://sajilobudget-frontend.onrender.com" // frontend on Render
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or curl
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS policy does not allow access from this origin"), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/income", incomeRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/summary", summaryRoutes)
app.use("/api/auth", authRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
.then(() => console.log('✅ MongoDB connected!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Sajilo Budget Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
