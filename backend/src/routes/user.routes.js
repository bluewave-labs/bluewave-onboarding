const express = require("express");
const { getUsersList, getCurrentUser, updateUser } = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users-list", getUsersList);
router.get("/current-user", authenticateJWT, getCurrentUser);
router.post("/update", authenticateJWT, updateUser);

module.exports = router;
