const db = require("../models");
const Link = db.Link;
const sequelize = db.sequelize;

class LinkService {
  async getAllLinks() {
    return await Link.findAll({
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  }

  async getLinksByHelperId(helperId) {
    return await Link.findAll({
      where: {
        helperId,
      },
      include: [
        {
          model: db.HelperLink,
          as: "helper",
        },
      ],
    });
  }

  async createLink(data) {
    const transaction = await sequelize.transaction();
    try {
      const link = await Link.create(data, { transaction });
      await transaction.commit();
      return link;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error creating link");
    }
  }

  async deleteLink(id) {
    const rowsAffected = await Link.destroy({ where: { id } });
    return rowsAffected !== 0;
  }

  async updateLink(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const [affectedRows, updatedPopups] = await Link.update(data, {
        where: { id },
        returning: true,
        transaction,
      });

      if (affectedRows === 0) return null;

      await transaction.commit();
      return updatedPopups[0];
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating link");
    }
  }

  async getLinkById(linkId) {
    try {
      return await Link.findOne({
        where: { id: linkId },
        include: [
          {
            model: db.HelperLink,
            as: "helper",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error retrieving link by ID");
    }
  }

  async getLinkByUrl(url) {
    try {
      return await Link.findAll({ where: { url } });
    } catch (error) {
      throw new Error("Error retrieving Link by URL");
    }
  };
}

module.exports = new LinkService();
