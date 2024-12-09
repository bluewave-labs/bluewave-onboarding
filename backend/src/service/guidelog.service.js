const db = require("../models");
const GuideLog = db.GuideLog;

class GuideLogService {
  async addGuideLog({ guideType, userId, guideId, completed }) {
    const transaction = await db.sequelize.transaction();
    try {
      const log = await GuideLog.create({
        guideType,
        userId,
        guideId,
        showingTime: new Date(),
        completed
      }, { transaction });
      await transaction.commit();
      return log;
    } catch (err) {
      await transaction.rollback();
      throw new Error(`Failed to create guide log: ${err.message}`);
    }
  }
  async getAllGuideLogs() {
    return await GuideLog.findAll();
  }
  async getCompleteGuideLogs(userId) {
    try {
      return await GuideLog.findAll({
        where: {
          userId: userId,
          completed: true,
        },
      });
    } catch (err) {
      throw new Error(`Failed to retrieve guide log for user ${userId}: ${err.message}`);
    }
  }

  async getLogsByUser(userId) {
    try {
      return await GuideLog.findAll({
        where: {
          userId: userId,
        },
      });
    } catch (err) {
      throw new Error(`Failed to retrieve guide log for user ${userId}: ${err.message}`);
    }
  }
}

module.exports = new GuideLogService();
