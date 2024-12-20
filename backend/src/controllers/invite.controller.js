const InviteService = require("../service/invite.service");
const { internalServerError } = require("../utils/errors.helper");

const inviteService = new InviteService();

const sendTeamInvite = async (req, res) => {
  const userId = req.user.id;
  const { invitedEmail, role } = req.body;
  try {
    await inviteService.sendInvite(userId, invitedEmail, role);
    return res.status(200).json({
      status: 200,
      message: "Invite sent successfully",
      data: null,
    });
  } catch (err) {
    const { statusCode, payload } = internalServerError(
      "SEND_INVITE_ERROR",
      err.message
    );
    res.status(statusCode).json(payload);
  }
};

const getAllInvites = async (req, res) => {
  try {
    const invites = await inviteService.getAllInvites();
    return res.status(200).json({
      invites,
      success: true,
      message: "Invites Retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendTeamInvite, getAllInvites, inviteService };
