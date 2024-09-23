const express = require("express");
const tourController = require("../controllers/tourController");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

// Create a new tour
router.post("/add_tour", authenticateJWT, tourController.addTour);

// Delete a tour by ID
router.delete("/delete_tour/:id", authenticateJWT, tourController.deleteTour);

// Edit a tour by ID
router.put("/edit_tour/:id", authenticateJWT, tourController.editTour);

// Get all tours
router.get("/all_tours", authenticateJWT, tourController.getAllTours);

// Get tours created by the authenticated user
router.get("/tours", authenticateJWT, tourController.getTours);

// Get a specific tour by ID
router.get("/get_tour/:id", authenticateJWT, tourController.getTourById);

module.exports = router;
