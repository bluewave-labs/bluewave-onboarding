const { body, param } = require("express-validator");
const { isValidHexColor } = require("./guideHelpers");

const bannerValidationRules = {
  addBanner: [
    body("position").isIn(["top", "bottom"]).withMessage("Invalid position"),
    body("closeButtonAction")
      .isIn(["no action", "open url", "open url in a new tab"])
      .withMessage("Invalid closeButtonAction"),
    body("fontColor").custom(isValidHexColor).withMessage("Invalid fontColor"),
    body("backgroundColor")
      .custom(isValidHexColor)
      .withMessage("Invalid backgroundColor"),
  ],
  editBanner: [
    param("id").isInt().withMessage("Invalid id"),
    body("position")
      .optional()
      .isIn(["top", "bottom"])
      .withMessage("Invalid position"),
    body("closeButtonAction")
      .optional()
      .isIn(["no action", "open url", "open url in a new tab"])
      .withMessage("Invalid closeButtonAction"),
    body("fontColor")
      .optional()
      .custom(isValidHexColor)
      .withMessage("Invalid fontColor"),
    body("backgroundColor")
      .optional()
      .custom(isValidHexColor)
      .withMessage("Invalid backgroundColor"),
  ],
  deleteBanner: [param("id").isInt().withMessage("Invalid id")],
  getBannerById: [param("id").isInt().withMessage("Invalid id")],
};

module.exports = bannerValidationRules;
