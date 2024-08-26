const db = require("../models");
const Popup = db.Popup;

class PopupService {
  async getAllPopups() {
    return await Popup.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getPopups(userId) {
    return await Popup.findAll({
      where: {
        createdBy: userId
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createPopup(data) {
    return await Popup.create(data);
  }

  async deletePopup(id) {
    const rowsAffected = await Popup.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updatePopup(id, data) {
    const [affectedRows, updatedPopups] = await Popup.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      return null;
    }

    return updatedPopups[0];
  }

  async getPopupById(popupId) {
    try {
      return await Popup.findOne({
        where: { id: popupId },
        include: [{ model: db.User, as: "creator" }],
      });
    } catch (error) {
      throw new Error("Error retrieving popup by ID");
    }
  }
}

module.exports = new PopupService();
