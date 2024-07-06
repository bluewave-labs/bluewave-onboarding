const express = require("express");
const popup_log_controller = require("../controllers/popup_log_controller");

const router = express.Router();

router.post("/add_popup_log", popup_log_controller.addPopupLog);
router.get("/get_popup_logs", popup_log_controller.getAllPopups);

module.exports = router;