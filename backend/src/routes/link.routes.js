const express = require("express");
const linkController = require("../controllers/link.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticateJWT);

router
  .route("/")
  .post(linkController.addLink)
  .get(linkController.getLinksByHelperId);

router.route("/all_links").get(linkController.getAllLinks);

router
  .route("/:id")
  .get(linkController.getLinksById)
  .put(linkController.editLink)
  .delete(linkController.deleteLink);

module.exports = router;
