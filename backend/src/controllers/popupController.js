const popupService = require("../service/popup.service");
const { internalServerError } = require("../utils/errors");
const { isValidHexColor } = require("../utils/guideHelpers");
const db = require("../models");
const Popup = db.Popup;

const validatePopupSize = (value) => {
  const validSizes = ["small", "medium", "large"];
  return validSizes.includes(value);
};

const validateCloseButtonAction = (value) => {
  const validActions = ["no action", "open url", "open url in a new tab"];
  return validActions.includes(value);
};

class PopupController {
  async addPopup(req, res) {
    const userId = req.user.id;
    const {
      popupSize,
      closeButtonAction,
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    } = req.body;

    if (!popupSize || !closeButtonAction) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "popupSize and closeButtonAction are required" }],
        });
    }

    if (
      !validatePopupSize(popupSize) ||
      !validateCloseButtonAction(closeButtonAction)
    ) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Invalid value for popupSize or closeButtonAction" }],
        });
    }

    const colorFields = {
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    };
    for (const [field, value] of Object.entries(colorFields)) {
      if (value && !isValidHexColor(value)) {
        return res
          .status(400)
          .json({
            errors: [{ msg: `${field} must be a valid hex color code` }],
          });
      }
    }

    try {
      const newPopupData = { ...req.body, createdBy: userId };
      const newPopup = await popupService.createPopup(newPopupData);
      res.status(201).json(newPopup);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "CREATE_POPUP_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async deletePopup(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await popupService.deletePopup(id);

      if (!deletionResult) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Popup with the specified id does not exist" }],
          });
      }

      res
        .status(200)
        .json({ message: `Popup with ID ${id} deleted successfully` });
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "DELETE_POPUP_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async editPopup(req, res) {
    try {
      const { id } = req.params;

      if (!req.body.popupSize || !req.body.closeButtonAction) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "popupSize and closeButtonAction are required" }],
          });
      }

      const popupSizeColumn = Popup.tableAttributes.popupSize;

      if (!popupSizeColumn.validate.isIn[0].includes(req.body.popupSize)) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid value for popupSize" }] });
      }

      const closeButtonActionColumn = Popup.tableAttributes.closeButtonAction;

      if (
        !closeButtonActionColumn.validate.isIn[0].includes(
          req.body.closeButtonAction,
        )
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid value for closeButtonAction" }] });
      }

      const colorFields = [
        "headerBackgroundColor",
        "headerColor",
        "textColor",
        "buttonBackgroundColor",
        "buttonTextColor",
      ];
      
      for (const field of colorFields) {
        if (req.body[field] && !isValidHexColor(req.body[field])) {
          return res
            .status(400)
            .json({
              errors: [{ msg: `${field} must be a valid hex color code` }],
            });
        }
      }

      const updatedPopup = await popupService.updatePopup(id, req.body);
      res.status(200).json(updatedPopup);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "EDIT_POPUP_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllPopups(req, res) {
    try {
      const popups = await popupService.getAllPopups();
      res.status(200).json(popups);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_POPUPS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async getPopups(req, res) {
    try {
      const userId = req.user.id;
      const popups = await popupService.getPopups(userId);
      res.status(200).json(popups);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_POPUPS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  async getPopupById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid popup ID" }] });
      }

      const popup = await popupService.getPopupById(id);

      if (!popup) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Popup not found" }] });
      }

      res.status(200).json(popup);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_POPUP_BY_ID_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }

  
}

module.exports = new PopupController();
