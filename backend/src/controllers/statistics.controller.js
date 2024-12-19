const statisticsService = require("../service/statistics.service");

class StatisticsController {
  async getStatistics(req, res) {
    try {
      const userId = req.user.id;
      const statistics = await statisticsService.generateStatistics({ userId: String(userId) });
      res.status(200).json(statistics);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new StatisticsController();
