const popupService = require("../service/popuplog.service.js");
const { internalServerError } = require("../utils/errors.helper.js");
const db = require("../models/index.js");
const PopupLog = db.PopupLog;

const VALID_POPUP_TYPES = ['guide', 'tooltip', 'hotspot', 'checklist'];

class PopupLogController {
  async addPopupLog(req, res) {
      try {
          const { popupType, userId, completed } = req.body;
      
          if (!popupType || !userId) {
            return res.status(400).json({ message: 'popupType and userId are required' });
          }
          if (!VALID_POPUP_TYPES.includes(popupType)) {
              return res.status(400).json({ message: `Invalid popupType.` });
          }
          if (typeof userId !== 'string' || userId.trim() === '') {
              return res.status(400).json({ message: 'userId must be a non-empty string' });
          }
          if (completed !== undefined && typeof completed !== 'boolean') {
              return res.status(400).json({ message: 'completed must be a boolean value' });
          }
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