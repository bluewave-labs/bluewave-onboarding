const db = require("../models");
const PopupLog = db.PopupLog;
const sequelize = db.sequelize;

class PopupLogService {
  async addPopupLog({ popupType, userId, completed }) {
    const transaction = await sequelize.transaction();
    try {
      const popupLog = await PopupLog.create(
        {
          popupType,
          userId,
          showingTime: new Date(),
          completed,
        },
        { transaction }
      );

      await transaction.commit();
      return popupLog;
    }
    catch (error) {
      await transaction.rollback();
      throw new Error("Error adding popup log");
    }
  }
  async getAllPopupLogs() {
    return await PopupLog.findAll();
  }
}

module.exports = new PopupLogService();
