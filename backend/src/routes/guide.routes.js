const express = require("express");
const guideController = require("../controllers/guide.controller.js");

const router = express.Router();

router.get("/get_guides_by_url", guideController.getGuidesByUrl);
router.get("/get_incomplete_guides_by_url", guideController.getIncompleteGuidesByUrl);

module.exports = router;
