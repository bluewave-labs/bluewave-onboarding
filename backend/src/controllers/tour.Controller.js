const Tour = require("../models").Tour;
const { internalServerError } = require("../utils/errors");

class TourController {
  async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(200).json(tours);
    } catch (err) {
      console.error("GET_ALL_TOURS_ERROR:", err);
      const { statusCode, payload } = internalServerError(
        "GET_ALL_TOURS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async createTour(req, res) {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json(newTour);
    } catch (err) {
      console.error("CREATE_TOUR_ERROR:", err);
      const { statusCode, payload } = internalServerError(
        "CREATE_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async updateTour(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Tour.update(req.body, {
        where: { id },
      });
      if (!updated) {
        return res.status(404).json({ error: "Tour not found" });
      }
      const updatedTour = await Tour.findOne({ where: { id } });
      res.status(200).json(updatedTour);
    } catch (err) {
      console.error("UPDATE_TOUR_ERROR:", err);
      const { statusCode, payload } = internalServerError(
        "UPDATE_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteTour(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Tour.destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res
        .status(200)
        .json({ message: `Tour with ID ${id} deleted successfully` });
    } catch (err) {
      console.error("DELETE_TOUR_ERROR:", err);
      const { statusCode, payload } = internalServerError(
        "DELETE_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new TourController();
