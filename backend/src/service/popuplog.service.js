const db = require("../models");
const PopupLog = db.PopupLog;

class PopupLogService {
  async  addPopupLog({ popupType, userId, completed }) {
        return await PopupLog.create({
                popupType,
                userId,
                showingTime: new Date(),
                completed
            });
    }
    async getAllPopupLogs() {
        return await PopupLog.findAll();
      }
}

module.exports = new PopupLogService();
