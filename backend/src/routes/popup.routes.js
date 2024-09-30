const express = require("express");
const popupController = require("../controllers/popup.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add_popup", authenticateJWT, popupController.addPopup);
router.delete("/delete_popup/:id", authenticateJWT, popupController.deletePopup);
router.put("/edit_popup/:id", authenticateJWT, popupController.editPopup);
router.get("/all_popups", authenticateJWT, popupController.getAllPopups);
router.get("/popups", authenticateJWT, popupController.getPopups);
router.get("/get_popup/:id", authenticateJWT, popupController.getPopupById);

module.exports = router;
