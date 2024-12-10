const popupService = require('../../service/popup.service');

const getPopupData = async (req, res) => {
  try {
    const { userId } = req.body;
    const popupData = await popupService.getPopups(userId);
    res.status(200).json(popupData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopupData };
