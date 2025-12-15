const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const protect = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser",protect, getUser);

module.exports = router;
