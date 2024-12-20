const express = require("express");
const { validateApiId, generateClientId } = require("../middleware/onboard.middleware");
const onboardControllers = require("../controllers/onboard");

const router = express.Router();

router.use(validateApiId);
router.use(generateClientId);

// router.get("/banner", onboardControllers.bannerData.getBannerData);
router.get("/popup", onboardControllers.popupData.getPopupData);
// router.get("/tour", onboardControllers.tourData.getTourData);
// router.get("/hint", onboardControllers.hintData.getHintData);

module.exports = router;
