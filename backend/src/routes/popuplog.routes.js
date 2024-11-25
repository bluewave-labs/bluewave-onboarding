const express = require("express");
const popuplogController = require("../controllers/popuplog.controller");
const {addPopupLogValidation} = require('../utils/popuplog.helper')
const {handleValidationErrors} = require('../middleware/validation.middleware')
const router = express.Router();

router.post("/add_popup_log", addPopupLogValidation, handleValidationErrors, popuplogController.addPopupLog);
router.get("/get_popup_logs", popuplogController.getAllPopups);

module.exports = router;