const express = require("express");
const UserController = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users-list", UserController.getUsersList.bind(UserController));
router.get("/current-user", authenticateJWT, UserController.getCurrentUser.bind(UserController));

module.exports = router;