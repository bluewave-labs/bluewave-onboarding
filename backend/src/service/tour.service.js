const db = require("../models");
const Tour = db.Tour;

class TourService {
  async getAllTours() {
    return await Tour.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getTours(userId) {
    return await Tour.findAll({
      where: {
        createdBy: userId
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createTour(data) {
    return await Tour.create(data);
  }

  async deleteTour(id) {
    const rowsAffected = await Tour.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updateTour(id, data) {
    const [affectedRows, updatedTours] = await Tour.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      return null;
    }

    return updatedTours[0];
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
