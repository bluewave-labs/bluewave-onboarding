const popupService = require("../service/popuplog.service.js");
const { internalServerError } = require("../utils/errors.helper.js");
const {validationResult} = require('express-validator')
const db = require("../models/index.js");
const PopupLog = db.PopupLog;

class PopupLogController {
  async addPopupLog(req, res) {
      try {
          const { popupType, userId, completed } = req.body;
          // Default completed to false if not provided
          const isCompleted = completed !== undefined ? completed : false;

          const popupLog = await popupService.addPopupLog({ popupType, userId, completed: isCompleted });
    
          res.status(201).json(popupLog);
        } catch (error) {
          res.status(500).json({ message: 'Error logging popup event', error });
        }
      }
  async getAllPopups(req, res) {
    try {
      const popupLogs = await popupService.getAllPopupLogs();
      res.status(200).json(popupLogs);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_POPUP_LOGS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new PopupLogController();