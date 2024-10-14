const bannerService = require("../service/banner.service.js");
const { internalServerError } = require("../utils/errors");
const { bannerValidationRules } = require('../utils/bannerValidationRules.js');
const db = require("../models"); 
const Banner = db.Banner;

const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const handleAsyncErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const { statusCode, payload } = internalServerError(
      `${fn.name.toUpperCase()}_ERROR`,
      error.message
    );
    res.status(statusCode).json(payload);
  });

class BannerController {
  addBanner = [
    ...bannerValidationRules.addBanner,
    handleValidationErrors,
    handleAsyncErrors(async (req, res) => {
      const userId = req.user.id;
      const newBannerData = { ...req.body, createdBy: userId };
      const newBanner = await bannerService.createBanner(newBannerData);
      res.status(201).json(newBanner);
    })
  ];

  deleteBanner = [
    ...bannerValidationRules.deleteBanner,
    handleValidationErrors,
    handleAsyncErrors(async (req, res) => {
      const { id } = req.params;
      const deletionResult = await bannerService.deleteBanner(id);
      if (!deletionResult) {
        return res.status(404).json({ errors: [{ msg: "Banner not found" }] });
      }
      res.status(200).json({ message: `Banner with ID ${id} deleted successfully` });
    })
  ];

  editBanner = [
    ...bannerValidationRules.editBanner,
    handleValidationErrors,
    handleAsyncErrors(async (req, res) => {
      const { id } = req.params;
      const updatedBanner = await bannerService.updateBanner(id, req.body);
      if (!updatedBanner) {
        return res.status(404).json({ errors: [{ msg: "Banner not found" }] });
      }
      res.status(200).json(updatedBanner);
    })
  ];

  getAllBanners = handleAsyncErrors(async (req, res) => {
    const banners = await bannerService.getAllBanners();
    res.status(200).json(banners);
  });

  getBanners = handleAsyncErrors(async (req, res) => {
    const userId = req.user.id;
    const banners = await bannerService.getBanners(userId);
    res.status(200).json(banners);
  });

  getBannerById = [
    ...bannerValidationRules.getBannerById,
    handleValidationErrors,
    handleAsyncErrors(async (req, res) => {
      const { id } = req.params;
      const banner = await bannerService.getBannerById(id);
      if (!banner) {
        return res.status(404).json({ errors: [{ msg: "Banner not found" }] });
      }
      res.status(200).json(banner);
    })
  ];
}

module.exports = new BannerController();