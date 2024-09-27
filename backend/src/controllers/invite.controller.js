const InviteService = require("../service/invite.service");

const inviteService = new InviteService();

const sendTeamInvite = async (req, res) => {
  const userId = req.user.id;
  const { invitedEmail, role } = req.body;
  try {
    await inviteService.sendInvite(userId, invitedEmail, role);
    return res.status(200).json({ message: "invite Sent" });
  } catch (err) {
    res.status(500).json({ error: "some error" });
  }
};

module.exports = { sendTeamInvite };
