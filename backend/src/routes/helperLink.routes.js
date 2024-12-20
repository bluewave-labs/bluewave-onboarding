const express = require("express");
const helper = require("../controllers/helperLink.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const settings = require('../../config/settings');
const accessGuard = require('../middleware/accessGuard.middleware');
const helperController = helper.controller;


const router = express.Router();
const teamPermissions = settings.team.permissions;


router.post("/add_helper", authenticateJWT, accessGuard(teamPermissions.helpers), helperController.addHelper);
router.get("/get_helpers", authenticateJWT, helperController.getHelpersByUserId);
router.get("/get_helpers_with_links", authenticateJWT, helperController.getAllHelpersWithLinks);
router.get("/all_helpers", authenticateJWT, helperController.getAllHelpers);
router.get("/get_helper/:id", authenticateJWT, helperController.getHelperById);
router.put("/edit_helper/:id", authenticateJWT, accessGuard(teamPermissions.helpers), helperController.editHelper);
router.delete("/delete_helper/:id", authenticateJWT, accessGuard(teamPermissions.helpers), helperController.deleteHelper);


module.exports = router;
