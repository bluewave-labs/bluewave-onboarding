const db = require("../models");
const GuideLog = db.GuideLog;

class GuideLogService {
  async  addGuideLog({ popupType, userId, completed }) {
        return await GuideLog.create({
                popupType,
                userId,
                showingTime: new Date(),
                completed
            });
    }
    async getAllGuideLogs() {
        return await GuideLog.findAll();
      }
}

module.exports = new GuideLogService();
