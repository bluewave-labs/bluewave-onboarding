const express = require("express");
const { 
    getUsersList,
    getCurrentUser,
    updateUserDetails,
    checkAtLeastOneField,
    validateProfileUpdate,
    handleValidationErrors,
    deleteUser
} = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users-list", getUsersList);
router.get("/current-user", authenticateJWT, getCurrentUser);
router.put("/update-profile", authenticateJWT, checkAtLeastOneField, validateProfileUpdate, handleValidationErrors, updateUserDetails);
router.delete("/delete", authenticateJWT, deleteUser);

module.exports = router;
