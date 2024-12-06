const express = require("express");
const linkController = require("../controllers/link.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const settings = require('../../config/settings');
const accessGuard = require('../middleware/accessGuard.middleware');

const router = express.Router();
const teamPermissions = settings.team.permissions;

router.post("/add_link", authenticateJWT, accessGuard(teamPermissions.links), linkController.addLink);
router.get("/get_links", authenticateJWT, linkController.getLinksByHelperId);
router.get("/all_links", authenticateJWT, linkController.getAllLinks);
router.get("/get_link/:id", authenticateJWT, linkController.getLinksById);
router.put("/edit_link/:id", authenticateJWT, accessGuard(teamPermissions.links), linkController.editLink);
router.delete("/delete_link/:id", authenticateJWT, accessGuard(teamPermissions.links), linkController.deleteLink);
router.get("/get_link_by_url", linkController.getLinkByUrl);

module.exports = router;
