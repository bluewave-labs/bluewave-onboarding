const popupService = require("../service/popup.service");
const { internalServerError } = require("../utils/errors");
const { validatePopupData, isValidId } = require("../utils/popupValidationRules");

class PopupController {
  async addPopup(req, res) {
    try {
      const userId = req.user.id;
      const popupData = { ...req.body, createdBy: userId };

      const errors = validatePopupData(popupData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newPopup = await popupService.createPopup(popupData);
      res.status(201).json(newPopup);
    } catch (err) {
      this.handleError(res, "CREATE_POPUP_ERROR", err);
    }
  }

  async deletePopup(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await popupService.deletePopup(id);

      if (!deletionResult) {
        return res.status(404).json({ errors: [{ msg: "Popup not found" }] });
      }

      res.status(200).json({ message: `Popup with ID ${id} deleted successfully` });
    } catch (err) {
      this.handleError(res, "DELETE_POPUP_ERROR", err);
    }
  }

  async editPopup(req, res) {
    try {
      const { id } = req.params;
      const popupData = req.body;

      if (!isValidId(id)) {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const errors = validatePopupData(popupData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updatedPopup = await popupService.updatePopup(id, popupData);
      
      if (!updatedPopup) {
        return res.status(404).json({ errors: [{ msg: "Popup not found" }] });
      }

      res.status(200).json(updatedPopup);
    } catch (err) {
      this.handleError(res, "EDIT_POPUP_ERROR", err);
    }
  }

  async getAllPopups(req, res) {
    try {
      const popups = await popupService.getAllPopups();
      res.status(200).json(popups);
    } catch (err) {
      this.handleError(res, "GET_ALL_POPUPS_ERROR", err);
    }
  }

  async getPopups(req, res) {
    try {
      const userId = req.user.id;
      const popups = await popupService.getPopups(userId);
      res.status(200).json(popups);
    } catch (err) {
      this.handleError(res, "GET_POPUPS_ERROR", err);
    }
  }

  async getPopupById(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({ errors: [{ msg: "Invalid popup ID" }] });
      }

      const popup = await popupService.getPopupById(id);

      if (!popup) {
        return res.status(404).json({ errors: [{ msg: "Popup not found" }] });
      }

      res.status(200).json(popup);
    } catch (err) {
      this.handleError(res, "GET_POPUP_BY_ID_ERROR", err);
    }
  }

  handleError(res, errorCode, err) {
    console.error(err);
    const { statusCode, payload } = internalServerError(errorCode, err.message);
    res.status(statusCode).json(payload);
  }
}

module.exports = new PopupController();