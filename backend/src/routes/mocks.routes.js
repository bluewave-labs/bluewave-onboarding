const express = require("express");
const { popup, onboard } = require("./../controllers/onboarding.controller");

const router = express.Router();
router.get("/popup", popup);
router.get("/onboard", onboard);
router.post("/onboard", onboard);

module.exports = router;
