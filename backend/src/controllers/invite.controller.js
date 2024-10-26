const InviteService = require("../service/invite.service");
const { internalServerError } = require("../utils/errors.helper");

const inviteService = new InviteService();

const sendTeamInvite = async (req, res) => {
  const userId = req.user.id;
  const { invitedEmail, role } = req.body;
  try {
    await inviteService.sendInvite(userId, invitedEmail, role);
    return res.status(200).json({ message: "Invite Sent Successfully" });
  } catch (err) {
    const { statusCode, payload } = internalServerError(
      "SEND_INVITE_ERROR",
      err.message,
    );
    res.status(statusCode).json(payload);
  }
};

module.exports = { sendTeamInvite };
