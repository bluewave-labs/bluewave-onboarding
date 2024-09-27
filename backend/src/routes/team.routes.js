const express = require("express");
const { 
  getTeamDetails, 
  updateTeamDetails, 
} = require("../controllers/team.controller");
const {
    sendTeamInvite,
} = require("../controllers/invite.controller");
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/details", authenticateJWT, getTeamDetails);
// router.get("/invites-sent", authenticateJWT, getTeamInvitations);

router.post("/invite", authenticateJWT, sendTeamInvite);

router.post("/update", authenticateJWT, updateTeamDetails);

module.exports = router;
