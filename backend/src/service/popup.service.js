// services/popupService.js
const Popup = require('../models/Popup');

class PopupService {
  async getAllPopups() {
    return await Popup.findAll();
}
  async createPopup(data) {
    return await Popup.create(data);
  }

  async deletePopup(id) {
    const rowsAffected = await Popup.destroy({ where: { id } });

    // If no rows were affected (ID doesn't exist), return false
    if (rowsAffected === 0) {
        return false;
    }

    // If at least one row was affected, return true
    return true;
}

  async updatePopup(id, data) {
    const [affectedRows, updatedPopups] = await Popup.update(data, {
      where: { id },
      returning: true,
    });
    return updatedPopups[0]; // return the updated popup
  }
}

module.exports = new PopupService();
