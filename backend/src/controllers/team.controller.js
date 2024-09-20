const { Sequelize } = require("sequelize");
const TeamService = require("../service/team.service");

const teamService = new TeamService();

const getTeamDetails = async (req, res) => {
  const userId = req.user.id;
  const teamId = req.query.teamId;
  try {
    const team = await teamService.getTeamById(userId, teamId);
    const result = {
        name: team.name,
        users: team.Users,
    }
    return res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: "some error" }); // tbu later
  }
};

// const getTeamsList = async (req, res) => {
//     const userId = req.user.id;
//     try {
//       const teams = teamService.getTeamById(userId, teamId);
      
//       return res.status(200).json({teams: ...teams.map((team) => ({
//         name: team.name,
//         role:
//       }))});
//     } catch (err) {
//       res.status(500).json({ error: "some error" }); // tbu later
//     }
//   };


module.exports = { getTeamDetails };
