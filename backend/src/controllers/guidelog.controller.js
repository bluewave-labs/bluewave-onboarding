const guidelogService = require("../service/guidelog.service.js");
const { internalServerError } = require("../utils/errors.helper.js");

class GuideLogController {
  async addGuideLog(req, res) {
      try {
          const { popupType, userId, completed } = req.body;
          const isCompleted = completed !== undefined ? completed : false;

          const guideLog = await guidelogService.addGuideLog({ popupType, userId, completed: isCompleted });
    
          res.status(201).json(guideLog);
        } catch (error) {
          res.status(500).json({ message: 'Error logging popup event', error });
        }
      }
  async getAllPopups(req, res) {
    try {
      const guideLogs = await guidelogService.getAllGuideLogs();
      res.status(200).json(guideLogs);
    } catch (err) {
      const { statusCode, payload } = internalServerError(
        "GET_ALL_POPUP_LOGS_ERROR",
        err.message,
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new GuideLogController();