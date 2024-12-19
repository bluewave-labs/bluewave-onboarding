const db = require("../models");
const { GuideType } = require("../utils/guidelog.helper");
const GuideLog = db.GuideLog;
const Statistics = db.Statistics;

class StatisticsService {
  async generateStatistics({ userId }) {
    const views = await Promise.all(
      Object.entries(GuideLog).map(async ([guideName, guideType]) => {
        await GuideLog.findAll({
          where: {
            guideType,
            userId,
          },
        });
        const thisMonth = new Date();
        thisMonth.setDate(thisMonth.getDate() - 30);
        const lastMonth = new Date();
        lastMonth.setDate(lastMonth.getDate() - 60);
        const thisMonthViews = views.filter(
          (view) => view.showingTime >= thisMonth
        );
        const lastMonthViews = views.filter(
          (view) =>
            view.showingTime >= lastMonth && view.showingTime < thisMonth
        );
        const percentageDifference = Math.round(
          ((thisMonthViews.length - lastMonthViews.length) /
            lastMonthViews.length) *
            100
        );
        const result = {
          views: thisMonthViews.length,
          change: percentageDifference,
          guideType: guideName,
        };
        const newData = await Statistics.create(result);
        return newData;
      })
    );
    return views;
  }

  async getStatisticsByUserId({ userId }) {
    return await Statistics.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async getStatisticsByGuideType({ guideType, userId }) {
    return await Statistics.findAll({
      where: { guideType, userId },
      order: [["createdAt", "DESC"]],
    });
  }
}

module.exports = new StatisticsService();
