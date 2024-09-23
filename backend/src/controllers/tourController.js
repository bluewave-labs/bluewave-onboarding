const tourService = require("../service/tour.service");
const { internalServerError } = require("../utils/errors");

const validateTriggeringFrequency = (value) => {
  const validFrequencies = [
    "Just once",
    "Once in every session",
    "Once every day",
    "Once every week",
    "Once every month",
    "Always"
  ];
  return validFrequencies.includes(value);
};

const validatePageTargeting = (value) => {
  const values = [
    "equals to",
    "is different from"
  ];
  return values.includes(value);
};

const validateTheme = (value) => {
  return value === "default theme";
};

class TourController {
  async addTour(req, res) {
    const userId = req.user.id;
    const {
      title,
      pageTargeting,
      theme,
      triggeringFrequency,
    } = req.body;

    if (!title || !pageTargeting || !theme || !triggeringFrequency) {
      return res.status(400).json({
        errors: [{ msg: "title, pageTargeting, theme, and triggeringFrequency are required" }]
      });
    }

    if (!validatePageTargeting(pageTargeting) || !validateTheme(theme) || !validateTriggeringFrequency(triggeringFrequency)) {
      return res.status(400).json({
        errors: [{ msg: "Invalid value for pageTargeting, theme, or triggeringFrequency" }]
      });
    }

    try {
      const newTourData = { ...req.body, createdBy: userId };
      const newTour = await tourService.createTour(newTourData);
      res.status(201).json(newTour);
    } catch (err) {
      console.log(err);
      const { statusCode, payload } = internalServerError("CREATE_TOUR_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }

  async deleteTour(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
      }

      const deletionResult = await tourService.deleteTour(id);

      if (!deletionResult) {
        return res.status(400).json({
          errors: [{ msg: "Tour with the specified id does not exist" }]
        });
      }

      res.status(200).json({ message: `Tour with ID ${id} deleted successfully` });
    } catch (err) {
      const { statusCode, payload } = internalServerError("DELETE_TOUR_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }

  async editTour(req, res) {
    try {
      const { id } = req.params;

      if (!req.body.title || !req.body.pageTargeting || !req.body.theme || !req.body.triggeringFrequency) {
        return res.status(400).json({
          errors: [{ msg: "title, pageTargeting, theme, and triggeringFrequency are required" }]
        });
      }

      if (!validatePageTargeting(req.body.pageTargeting) || !validateTheme(req.body.theme) || !validateTriggeringFrequency(req.body.triggeringFrequency)) {
        return res.status(400).json({
          errors: [{ msg: "Invalid value for pageTargeting, theme, or triggeringFrequency" }]
        });
      }

      const updatedTour = await tourService.updateTour(id, req.body);
      res.status(200).json(updatedTour);
    } catch (err) {
      const { statusCode, payload } = internalServerError("EDIT_TOUR_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }

  async getAllTours(req, res) {
    try {
      const tours = await tourService.getAllTours();
      res.status(200).json(tours);
    } catch (err) {
      const { statusCode, payload } = internalServerError("GET_ALL_TOURS_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }

  async getTours(req, res) {
    try {
      const userId = req.user.id;
      const tours = await tourService.getTours(userId);
      res.status(200).json(tours);
    } catch (err) {
      const { statusCode, payload } = internalServerError("GET_TOURS_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }

  async getTourById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || id.trim() === "") {
        return res.status(400).json({ errors: [{ msg: "Invalid tour ID" }] });
      }

      const tour = await tourService.getTourById(id);

      if (!tour) {
        return res.status(404).json({ errors: [{ msg: "Tour not found" }] });
      }

      res.status(200).json(tour);
    } catch (err) {
      const { statusCode, payload } = internalServerError("GET_TOUR_BY_ID_ERROR", err.message);
      res.status(statusCode).json(payload);
    }
  }
}

module.exports = new TourController();
