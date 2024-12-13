const db = require("../models");
const Tour = db.Tour;
const sequelize = db.sequelize;

class TourService {
  async getAllTours() {
    return await Tour.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getTours(userId) {
    return await Tour.findAll({
      where: {
        createdBy: userId,
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createTour(data) {
    const transaction = await sequelize.transaction();
    try {
      const tour = await Tour.create(data, { transaction });
      await transaction.commit();
      return tour;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error creating tour");
    }
  }

  async deleteTour(id) {
    const rowsAffected = await Tour.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updateTour(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const [affectedRows, updatedTours] = await Tour.update(data, {
        where: { id },
        returning: true,
        transaction,
      });

      if (affectedRows === 0) {
        return null;
      }
      await transaction.commit();
      return updatedTours[0];
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating tour");
    }
  }

  async getTourById(tourId) {
    try {
      return await Tour.findOne({
        where: { id: tourId },
        include: [{ model: db.User, as: "creator" }],
      });
    } catch (error) {
      throw new Error("Error retrieving tour by ID");
    }
  }
}

module.exports = new TourService();
