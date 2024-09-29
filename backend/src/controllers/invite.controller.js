const InviteService = require("../service/invite.service");

const inviteService = new InviteService();

const sendTeamInvite = async (req, res) => {
  const userId = req.user.id;
  const { invitedEmail, role } = req.body;
  try {
    await inviteService.sendInvite(userId, invitedEmail, role);
    return res.status(200).json({ message: "Invite Sent Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { sendTeamInvite };
