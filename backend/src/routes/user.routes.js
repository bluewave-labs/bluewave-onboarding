const express = require("express");
const { getUsersList, getCurrentUser, updateProfile, checkAtLeastOneField, validateProfileUpdate, handleValidationErrors } = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users-list", getUsersList);
router.get("/current-user", authenticateJWT, getCurrentUser);
router.put("/update-profile", authenticateJWT, checkAtLeastOneField, validateProfileUpdate, handleValidationErrors, updateProfile);

module.exports = router;
