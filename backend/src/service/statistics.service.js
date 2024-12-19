const db = require("../models");
const { GuideType } = require("../utils/guidelog.helper");
const GuideLog = db.GuideLog;

class StatisticsService {
  async generateStatistics({ userId }) {
    const views = await Promise.all(
      Object.entries(GuideType).map(async ([guideName, guideType]) => {
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
          guideType: guideName.toLowerCase(),
        };
        return result;
      })
    );
    return views;
  }
}

module.exports = new StatisticsService();
