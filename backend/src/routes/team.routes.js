const express = require("express");
const { 
  getTeamDetails, 
  getTeamsList, 
  updateTeamDetails, 
  createTeam, 
} = require("../controllers/team.controller");

const {
    sendTeamInvite,
    getRecievedInvites,
    acceptTeamInvite
} = require("../controllers/invite.controller")
const authenticateJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/details", authenticateJWT, getTeamDetails);
router.get("/list", authenticateJWT, getTeamsList);
router.get("/invites", authenticateJWT, getRecievedInvites);
// router.get("/invites-sent", authenticateJWT, getTeamInvitations);

router.post("/invite", authenticateJWT, sendTeamInvite);

router.post("/create", authenticateJWT, createTeam);
router.post("/update", authenticateJWT, updateTeamDetails);
router.post("/accept-invite", authenticateJWT, acceptTeamInvite);
// router.post("/reject-invite", authenticateJWT, rejectTeamInvite);

module.exports = router;
