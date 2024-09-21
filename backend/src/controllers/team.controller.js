const { Sequelize } = require("sequelize");
const TeamService = require("../service/team.service");

const teamService = new TeamService();

const getTeamDetails = async (req, res) => {
  const userId = req.user.id;
  const teamId = req.query.teamId;
  try {
    const data = await teamService.getTeamById(userId, teamId);
    const result = {
        id: data.id,
        name: data.name,
        role: data.role,
        users: data.Users.map((user)=> ({
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

// const getTeamsList = async (req, res) => {
//     const userId = req.user.id;
//     try {
//       const data = await teamService.getTeams(userId);
//       const result = {
//         teams: data.Teams.map((team) => ({
//             id: team.id,
//             name: team.name,
//             role: team.UserTeams.role,
//         }))
//       }
//       return res.status(200).json(result);
//     } catch (err) {
//       res.status(500).json({ error: "some error" }); // tbu later
//     }
// };

// const createTeam = async (req, res) => {
//     const userId = req.user.id;
//     const { name } = req.body;
//     try {
//       await teamService.createTeam(userId, name);
//       return res.status(200).json({ message: "Team created" });
//     } catch (err) {
//       res.status(500).json({ error: "some error" }); // tbu later
//     }
// };

const updateTeamDetails = async (req, res) => {
    const userId = req.user.id;
    const { teamId, name } = req.body;
    try {
      await teamService.updateTeam(userId, teamId, name);
      return res.status(200).json({ message: "Team updated" });
    } catch (err) {
      res.status(500).json({ error: "some error" }); // tbu later
    }
};

module.exports = { getTeamDetails, getTeamsList, createTeam, updateTeamDetails };
