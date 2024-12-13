const db = require("../models");
const Hint = db.Hint;
const sequelize = db.sequelize;

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
    const transaction = await sequelize.transaction();
    try {
      const hint = await Hint.create(data, { transaction });
      await transaction.commit();
      return hint;
    } catch (error) {
      await transaction.rollback();
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
    const transaction = await sequelize.transaction();
    try {
      const [affectedRows, updatedHints] = await Hint.update(data, {
        where: { id },
        returning: true,
        transaction,
      });
      if (affectedRows === 0) {
        return null;
      }
      await transaction.commit();
      return updatedHints[0];
    } catch (error) {
      await transaction.rollback();
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
}

module.exports = new HintService();
