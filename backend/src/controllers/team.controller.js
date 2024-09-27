const TeamService = require("../service/team.service");

const teamService = new TeamService();

const getTeamDetails = async (req, res) => {
  try {
    const data = await teamService.getTeam();
    const result = {
        name: data.team.name,
        users: data.users.map((user)=> ({
            name: user.name,
            email: user.email,
            role: user.UserTeams.role,
        })),
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
};

const updateTeamDetails = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    try {
      await teamService.updateTeam(userId, name);
      return res.status(200).json({ message: "Team updated" });
    } catch (err) {
      res.status(500).json({ error: "some error" }); // tbu later
    }
};

const removeMember = async (req, res) => {
  const userId = req.user.id;
  const { memberId } = req.body;
  try {
    await teamService.removeMemberFromTeam(userId, memberId);
    return res.status(200).json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
}

module.exports = { getTeamDetails, updateTeamDetails, removeMember };
