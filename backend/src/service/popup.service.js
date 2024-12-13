const db = require("../models");
const Popup = db.Popup;
const sequelize = db.sequelize;

class PopupService {
  async getAllPopups() {
    return await Popup.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getPopups(userId) {
    return await Popup.findAll({
      where: {
        createdBy: userId,
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createPopup(data) {
    const transaction = await sequelize.transaction();
    try {
      const popup = await Popup.create(data, { transaction });
      await transaction.commit();
      return popup;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error creating popup");
    }
  }

  async deletePopup(id) {
    const rowsAffected = await Popup.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updatePopup(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const [affectedRows, updatedPopups] = await Popup.update(data, {
        where: { id },
        returning: true,
        transaction,
      });

      if (affectedRows === 0) {
        return null;
      }

      await transaction.commit();
      return updatedPopups[0];
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating popup");
    }
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

  async getPopupByApiAndClientId(apiId, clientId) {
    try {
      return await Popup.findAll({
        include: [
          {
            model: db.User,
            as: "creator",
            where: { apiId }
          },
        ],
        where: { clientId },
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw new Error("Error retrieving popups for the given API and Client ID");
    }
  }

  async getPopupByUrl(url) {
    try {
      return await Popup.findAll({ where: { url } });
    } catch (error) {
      throw new Error("Error retrieving Popup by URL");
    }
  };
}

module.exports = new PopupService();
