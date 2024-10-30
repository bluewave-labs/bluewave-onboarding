const db = require("../models");
const HelperLink = db.HelperLink;

class HelperLinkService {
  async getAllHelpers() {
    return await HelperLink.findAll({
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
  }

  async getHelpersByUserId(userId) {
    return await HelperLink.findAll({
      where: {
        createdBy: userId,
      },
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
  }

  async createHelper(data) {
    return await HelperLink.create(data);
  }

  async deleteHelper(id) {
    const rowsAffected = await HelperLink.destroy({ where: { id } });
    return rowsAffected !== 0;
  }

  async updateHelper(id, data) {
    const [affectedRows, updatedPopups] = await HelperLink.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) return null;

    return updatedPopups[0];
  }

  async getHelperById(helperId) {
    try {
      return await HelperLink.findOne({
        where: { id: helperId },
        include: [
          {
            model: db.User,
            as: "creator",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });
    } catch (error) {
      throw new Error("Error retrieving helper by ID");
    }
  }
}

module.exports = new HelperLinkService();
