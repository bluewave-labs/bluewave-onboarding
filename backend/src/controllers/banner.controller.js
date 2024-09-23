const bannerService = require("../service/banner.service.js");
const { internalServerError } = require("../utils/errors");
const { isValidHexColor, checkColorFields } = require("../utils/guideHelpers");
const db = require("../models"); 
const Banner = db.Banner;

const validatePosition = (value) => {
  const validPositions = ["top", "bottom"];
  return validPositions.includes(value);
};

const validateCloseButtonAction = (value) => {
  const validActions = ["no action", "open url", "open url in a new tab"];
  return validActions.includes(value);
};

class BannerController {
  async addBanner(req, res) {
    const userId = req.user.id;
    const { position, closeButtonAction, fontColor, backgroundColor } = req.body;

    if (!position || !closeButtonAction) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "position and closeButtonAction are required" }],
        });
    }

    if (!validatePosition(position) || !validateCloseButtonAction(closeButtonAction)) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Invalid value entered" }],
        });
    }

    const colorFields = { fontColor, backgroundColor };
    checkColorFields(colorFields);

    try {
      const newBannerData = { ...req.body, createdBy: userId };
      const newBanner = await bannerService.createBanner(newBannerData);
      res.status(201).json(newBanner);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "CREATE_BANNER_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteBanner(req, res) {
    try {
      const { id } = req.params;

      if (Number.isNaN(Number(id)) || id.trim() === "")  {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await bannerService.deleteBanner(id);

      if (!deletionResult) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Banner with the specified id does not exist" }],
          });
      }

      res
        .status(200)
        .json({ message: `Banner with ID ${id} deleted successfully` });
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "DELETE_BANNER_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async editBanner(req, res) {
    try {
      const { id } = req.params;

      if (!req.body.position || !req.body.closeButtonAction) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "position and closeButtonAction are required" }],
          });
      }

      const positionColumn = Banner.tableAttributes.position;

      if (!positionColumn.validate.isIn[0].includes(req.body.position)) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid value for position" }] });
      }

      const closeButtonActionColumn = Banner.tableAttributes.closeButtonAction;

      if (
        !closeButtonActionColumn.validate.isIn[0].includes(
          req.body.closeButtonAction,
        )
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid value for closeButtonAction" }] });
      }

      const colorFields = ["fontColor", "backgroundColor"];
      for (const field of colorFields) {
        if (req.body[field] && !isValidHexColor(req.body[field])) {
          return res
            .status(400)
            .json({
              errors: [{ msg: `${field} must be a valid hex color code` }],
            });
        }
      }

      const updatedBanner = await bannerService.updateBanner(id, req.body);
      res.status(200).json(updatedBanner);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "EDIT_BANNER_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllBanners(req, res) {
    try {
      const banners = await bannerService.getAllBanners();
      res.status(200).json(banners);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_BANNERS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }
  async getBanners(req, res) {
    try {
      const userId = req.user.id;
      const banners = await bannerService.getBanners(userId);
      res.status(200).json(banners);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET\_BANNERS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async getBannerById(req, res) {
    try {
      const { id } = req.params;

      if (Number.isNaN(Number(id)) || id.trim() === "")  {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const banner = await bannerService.getBannerById(id);

      if (!banner) {
        return res.status(404).json({ errors: [{ msg: "Banner not found" }] });
      }

      res.status(200).json(banner);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_BANNER_BY_ID_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

}

module.exports = new BannerController();
