const { Sequelize } = require("sequelize");
const InviteService = require("../service/invite.service");

const inviteService = new InviteService();

const sendTeamInvite = async (req, res) => {
    /**
     * who can send invite in a team?
     */
  const userId = req.user.id;
  const { teamId, invitedEmail, role } = req.body;
  try {
    await inviteService.sendInvite(userId, teamId, invitedEmail, role);
    return res.status(200).json({ message: "invite Sent" });
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
};

module.exports = { sendTeamInvite };
