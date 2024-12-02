const express = require("express");
const guidelogController = require("../controllers/guidelog.controller");
const {addGuideLogValidation, getLogByUserValidation} = require('../utils/guidelog.helper')
const {handleValidationErrors} = require('../middleware/validation.middleware')
const router = express.Router();

router.post("/add_guide_log", addGuideLogValidation, handleValidationErrors, guidelogController.addGuideLog);
router.get("/all_guide_logs", guidelogController.getAllLogs);
router.get("/guide_logs_by_user", getLogByUserValidation, guidelogController.getLogsByUser);
router.get("/complete_guide_logs", getLogByUserValidation, guidelogController.getCompleteGuideLogs);

module.exports = router;