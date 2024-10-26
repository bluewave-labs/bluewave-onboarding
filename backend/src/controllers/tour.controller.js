const tourService = require("../service/tour.service");
const { internalServerError } = require("../utils/errors.helper");
const {
  validateTriggeringFrequency,
  validatePageTargeting,
  validateTheme,
} = require("../utils/tour.helper");

class TourController {
  async addTour(req, res) {
    const userId = req.user.id;
    const { title, pageTargeting, theme, triggeringFrequency } = req.body;

    if (!title || !pageTargeting || !theme || !triggeringFrequency) {
      return res.status(400).json({
        errors: [
          {
            msg: "title, pageTargeting, theme, and triggeringFrequency are required",
          },
        ],
      });
    }

    if (
      !validatePageTargeting(pageTargeting) ||
      !validateTheme(theme) ||
      !validateTriggeringFrequency(triggeringFrequency)
    ) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid value for pageTargeting, theme, or triggeringFrequency",
          },
        ],
      });
    }

    try {
      const newTourData = { ...req.body, createdBy: userId };
      const newTour = await tourService.createTour(newTourData);
      res.status(201).json(newTour);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "CREATE_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async deleteTour(req, res) {
    const { id } = req.params;

    try {
      const deletedTour = await tourService.deleteTour(id);

      if (!deletedTour) {
        return res.status(404).json({ msg: "Tour not found" });
      }

      res.status(200).json({ msg: "Tour deleted successfully" });
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "DELETE_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async editTour(req, res) {
    const { id } = req.params;
    const updatedTourData = req.body;

    try {
      const updatedTour = await tourService.updateTour(id, updatedTourData);

      if (!updatedTour) {
        return res.status(404).json({ msg: "Tour not found" });
      }

      res.status(200).json(updatedTour);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "EDIT_TOUR_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getAllTours(req, res) {
    try {
      const tours = await tourService.getAllTours();
      res.status(200).json(tours);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "GET_TOURS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getTours(req, res) {
    const userId = req.user.id;

    try {
      const tours = await tourService.getToursByUserId(userId);
      res.status(200).json(tours);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "GET_USER_TOURS_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }

  async getTourById(req, res) {
    const { id } = req.params;

    try {
      const tour = await tourService.getTourById(id);

      if (!tour) {
        return res.status(404).json({ msg: "Tour not found" });
      }

      res.status(200).json(tour);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError(
        "GET_TOUR_BY_ID_ERROR",
        err.message
      );
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new TourController();
