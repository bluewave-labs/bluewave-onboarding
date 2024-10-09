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

const router = express.Router();

router.get("/details", authenticateJWT, getTeamDetails);

router.post("/invite", authenticateJWT, sendTeamInvite);
router.post("/update", authenticateJWT, updateTeamDetails);
router.post("/change-role", authenticateJWT, changeRole);

router.delete("/remove", authenticateJWT, removeMember);

module.exports = router;
