const express = require("express");
const tourController = require("../controllers/tour.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const settings = require('../../config/settings');
const accessGuard = require('../middleware/accessGuard.middleware');

const router = express.Router();
const teamPermissions = settings.team.permissions;

router.post("/add_tour", authenticateJWT, accessGuard(teamPermissions.tours), tourController.addTour);
router.delete("/delete_tour/:id", authenticateJWT, accessGuard(teamPermissions.tours), tourController.deleteTour);
router.put("/edit_tour/:id", authenticateJWT, accessGuard(teamPermissions.tours), tourController.editTour);
router.get("/all_tours", authenticateJWT, tourController.getAllTours);
router.get("/tours", authenticateJWT, tourController.getTours);
router.get("/get_tour/:id", authenticateJWT, tourController.getTourById);
// router.get("/get_tour_by_url", tourController.getTourByUrl);

module.exports = router;
