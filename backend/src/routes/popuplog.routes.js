const express = require("express");
const popuplogController = require("../controllers/popuplog.controller");

const router = express.Router();

router.post("/add_popup_log", popuplogController.addPopupLog);
router.get("/get_popup_logs", popuplogController.getAllPopups);

module.exports = router;