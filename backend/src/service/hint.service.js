const db = require("../models");
const Hint = db.Hint;

class HintService {
  async getAllHints() {
    try {
      return await Hint.findAll({
        include: [{ model: db.User, as: "creator" }],
      });
    } catch (error) {
      throw new Error("Error retrieving hints: " + error.message);
    }
  }

  async getHints(userId) {
    try {
      return await Hint.findAll({
        where: {
          createdBy: userId,
        },
        include: [{ model: db.User, as: "creator" }],
      });
    } catch (error) {
      throw new Error("Error retrieving hints: " + error.message);
    }
  }

  async createHint(data) {
    try {
      return await Hint.create(data);
    } catch (error) {
      throw new Error("Error creating hint: " + error.message);
    }
  }

  async deleteHint(id) {
    try {
      const rowsAffected = await Hint.destroy({ where: { id } });
      if (rowsAffected === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Error deleting hint: " + error.message);
    }
  }

  async updateHint(id, data) {
    try {
      const [affectedRows, updatedHints] = await Hint.update(data, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        return null;
      }
      return updatedHints[0];
    } catch (error) {
      throw new Error("Error updating hint: " + error.message);
    }
  }

  async getHintById(hintId) {
    try {
      return await Hint.findOne({
        where: { id: hintId },
        include: [{ model: db.User, as: "creator" }],
      });
    } catch (error) {
      throw new Error("Error retrieving hint by ID: " + error.message);
    }
  }
  async getHintByUrl(url) {
    try {
      return await Hint.findAll({ where: { url } });
    } catch (error) {
      throw new Error("Error retrieving Hint by URL");
    }
  };
}

module.exports = new HintService();
