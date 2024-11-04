const express = require("express");
const linkController = require("../controllers/link.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticateJWT);

router.route("/add_link").post(linkController.addLink);
router.route("/get_links").get(linkController.getLinksByHelperId);
router.route("/all_links").get(linkController.getAllLinks);
router.route("/get_link/:id").get(linkController.getLinksById);
router.route("/edit_link/:id").put(linkController.editLink);
router.route("/delete_link/:id").delete(linkController.deleteLink);

module.exports = router;
