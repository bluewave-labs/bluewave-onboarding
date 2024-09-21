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

const getRecievedInvites = async (req, res) => {
  const userEmail = req.user.email;
  try {
    const data = await inviteService.getRecievedInvites(userEmail);
    console.log("🚀 ~ getRecievedInvites ~ data:", data)
    const result = data.map((invite) => ({
        id: invite.id,
        team: {
            name: invite.team.name
            // add image slug
        },
        invitedBy: {
            name: invite.User.name
            // add image slug
        }
    }));
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
};

const acceptTeamInvite = async (req, res) => {
  const user = req.user;
  const { inviteId } = req.body;
  try {
    await inviteService.acceptInvite(user, inviteId);
    return res.status(200).json({ message: "Invite accepted" });
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
}

module.exports = { sendTeamInvite, getRecievedInvites, acceptTeamInvite };
