const bannerService = require("../service/banner.service.js");
const getBannerData = async (req, res) => {
  try {
    const { userId } = req.body;
    const bannerData = await bannerService.getBannerData(userId);
    res.status(200).json(bannerData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBannerData };
