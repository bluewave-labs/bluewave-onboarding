const popupService = require("../service/popuplog.service.js");
const { internalServerError } = require("../utils/errors.js");

const VALID_POPUP_TYPES = ["guide", "tooltip", "hotspot", "checklist"];

class PopupLogController {
  async addPopupLog(req, res) {
    try {
      const { popupType, userId, completed } = req.body;

      this.validateAddPopupLogInput(popupType, userId, completed);

      const popupLog = await popupService.addPopupLog({
        popupType,
        userId,
        completed: completed !== undefined ? completed : false,
      });

      res.status(201).json(popupLog);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Error logging popup event", error: error.message });
      }
    }
  }

  validateAddPopupLogInput(popupType, userId, completed) {
    if (!popupType || !userId) {
      throw new ValidationError("popupType and userId are required");
    }
    if (!VALID_POPUP_TYPES.includes(popupType)) {
      throw new ValidationError(
        `Invalid popupType. Must be one of: ${VALID_POPUP_TYPES.join(", ")}`
      );
    }
    if (typeof userId !== "string" || userId.trim() === "") {
      throw new ValidationError("userId must be a non-empty string");
    }
    if (completed !== undefined && typeof completed !== "boolean") {
      throw new ValidationError("completed must be a boolean value");
    }
  }

  async getAllPopups(req, res) {
    try {
      const popupLogs = await popupService.getAllPopupLogs();
      res.status(200).json(popupLogs);
    } catch (error) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_POPUP_LOGS_ERROR",
        error.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = new PopupLogController();
