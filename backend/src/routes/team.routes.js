const express = require("express");
const { 
  getTeamDetails, 
  updateTeamDetails, 
  removeMember, 
  changeRole 
} = require("../controllers/team.controller");
const {
    sendTeamInvite 
} = require("../controllers/invite.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const accessGuard = require("../middleware/accessGuard.middleware");
const settings = require("../../config/settings");

const router = express.Router();
const teamPermissions = settings.team.permissions;

router.get("/details", authenticateJWT, getTeamDetails);

router.post("/invite", authenticateJWT, accessGuard(teamPermissions.invite), sendTeamInvite);
router.put("/update", authenticateJWT, accessGuard(teamPermissions.update), updateTeamDetails);
router.put("/change-role", authenticateJWT, accessGuard(teamPermissions.changeRole), changeRole);

router.delete("/remove/:memberId", authenticateJWT, accessGuard(teamPermissions.removeUser), removeMember);

module.exports = router;
