const tourService = require('../service/tour.service');

const getTourData = async (req, res) => {
  try {
    const { userId } = req.body;
    const tourData = await tourService.getTourData(userId);
    res.status(200).json(tourData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTourData };
