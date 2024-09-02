const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const authenticateJWT = require("../middleware/auth.middleware");

router.get("/tours", authenticateJWT, tourController.getAllTours);
router.post("/tours", authenticateJWT, tourController.createTour);
router.put("/tours/:id", authenticateJWT, tourController.updateTour);
router.delete("/tours/:id", authenticateJWT, tourController.deleteTour);

module.exports = router;
