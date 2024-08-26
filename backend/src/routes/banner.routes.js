const express = require("express");
const bannerController = require("../controllers/banner.controller.js");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add_banner", authenticateJWT, bannerController.addBanner);
router.delete("/delete_banner/:id", authenticateJWT, bannerController.deleteBanner);
router.put("/edit_banner/:id", authenticateJWT, bannerController.editBanner);
router.get("/all_banners", authenticateJWT, bannerController.getAllBanners);
router.get("/banners", authenticateJWT, bannerController.getBanners);

module.exports = router;
