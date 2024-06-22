const express = require("express");
const { getUsersList } = require("../controllers/user.controller");

const router = express.Router();

router.get("/users-list", getUsersList);

module.exports = router;
