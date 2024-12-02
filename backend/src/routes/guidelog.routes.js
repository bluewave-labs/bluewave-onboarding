const express = require("express");
const guidelogController = require("../controllers/guidelog.controller");
const {addGuideLogValidation} = require('../utils/guidelog.helper')
const {handleValidationErrors} = require('../middleware/validation.middleware')
const router = express.Router();

router.post("/add_guide_log", addGuideLogValidation, handleValidationErrors, guidelogController.addGuideLog);
router.get("/get_guide_logs", guidelogController.getAllPopups);

module.exports = router;