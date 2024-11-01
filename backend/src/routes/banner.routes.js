const express = require("express");
const bannerController = require("../controllers/banner.controller.js");
const authenticateJWT = require("../middleware/auth.middleware");
const {addBannerValidation, deleteBannerValidation, getBannerByIdValidation, editBannerValidation,} = require('../utils/banner.helper.js')

const router = express.Router();

router.post("/add_banner", authenticateJWT, addBannerValidation, bannerController.addBanner);
router.delete("/delete_banner/:id", authenticateJWT, deleteBannerValidation, bannerController.deleteBanner);
router.put("/edit_banner/:id", authenticateJWT,editBannerValidation, bannerController.editBanner);
router.get("/all_banners", authenticateJWT, bannerController.getAllBanners);
router.get("/banners", authenticateJWT, bannerController.getBanners);
router.get("/get_banner/:id", authenticateJWT, getBannerByIdValidation, bannerController.getBannerById);

module.exports = router;
