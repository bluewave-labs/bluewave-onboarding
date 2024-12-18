const db = require("../models");
const Link = db.Link;

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
    return await Link.create(data);
  }

  async deleteLink(id) {
    const rowsAffected = await Link.destroy({ where: { id } });
    return rowsAffected !== 0;
  }

  async updateLink(id, data) {
    const [affectedRows, updatedPopups] = await Link.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) return null;

    return updatedPopups[0];
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
