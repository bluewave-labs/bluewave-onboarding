const db = require("../models");
const Team = db.Team

class UserService {
    async getTeamById({ userId, teamId }) {
        try {
            const team = await Team.findOne({
                where: { id: teamId },
                include: [{
                    model: User,
                    where: { id: userId }
                }],
            })

            return team;
        }
        catch(err) {
            throw new Error("Error retrieving Team");
        }
    }
    async getTeams(userId) {

    }
    async createTeam({ userId, name }) {

    }
    async updateTeam({ userId, teamId, name }) {

    }
}

module.exports = UserService;
