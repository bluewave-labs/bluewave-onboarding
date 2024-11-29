const express = require("express");
const { 
  setOrganisation,
  setConfig,
  getTeamDetails,
  getServerUrlAndApiKey,
  getTeamCount,
  updateTeamDetails, 
  removeMember, 
  changeRole 
} = require("../controllers/team.controller");
const {
    sendTeamInvite ,
    getAllInvites
} = require("../controllers/invite.controller");
const authenticateJWT = require("../middleware/auth.middleware");
const accessGuard = require("../middleware/accessGuard.middleware");
const settings = require("../../config/settings");

const router = express.Router();
const teamPermissions = settings.team.permissions;

router.get("/details", authenticateJWT, getTeamDetails);
router.get('/get-config', authenticateJWT, accessGuard(teamPermissions.serverUrlAndApiKey), getServerUrlAndApiKey);
router.get("/count", getTeamCount);

router.post("/set-organisation", authenticateJWT, accessGuard(teamPermissions.setOrg), setOrganisation);
router.post("/invite", authenticateJWT, accessGuard(teamPermissions.invite), sendTeamInvite);
router.put("/update", authenticateJWT, accessGuard(teamPermissions.update), updateTeamDetails);
router.put("/change-role", authenticateJWT, accessGuard(teamPermissions.changeRole), changeRole);
router.put('/set-config', authenticateJWT, accessGuard(teamPermissions.serverUrlAndApiKey), setConfig);

router.delete("/remove/:memberId", authenticateJWT, accessGuard(teamPermissions.removeUser), removeMember);
router.get('/get-all-invites', authenticateJWT, accessGuard(teamPermissions.removeUser), getAllInvites);
module.exports = router;
