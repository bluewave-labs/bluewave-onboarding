const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.Controller");
const authenticateJWT = require("../middleware/auth.middleware");

router.get("/", authenticateJWT, tourController.getAllTours);
router.post("/", authenticateJWT, tourController.createTour);
router.put("/:id", authenticateJWT, tourController.updateTour);
router.delete("/:id", authenticateJWT, tourController.deleteTour);

module.exports = router;
