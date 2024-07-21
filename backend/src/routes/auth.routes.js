const express = require("express");
const { register, login, logout, forgetPassword, resetPassword } = require("../controllers/auth.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateJWT, logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
