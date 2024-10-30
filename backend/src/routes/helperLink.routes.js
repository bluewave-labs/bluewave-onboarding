const express = require("express");
const helperController = require("../controllers/helperLink.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticateJWT);

router
  .route("/")
  .post(helperController.addHelper)
  .get(helperController.getHelpersByUserId);

router.route("/all_helpers").get(helperController.getAllHelpers);

router
  .route("/:id")
  .get(helperController.getHelperById)
  .put(helperController.editHelper)
  .delete(helperController.deleteHelper);

module.exports = router;
