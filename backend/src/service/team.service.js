const db = require("../models");
const { TEAM } = require("../utils/constants");
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
            });
            return team;
        }
        catch(err) {
            throw new Error("Error retrieving Team");
        }
    }
    async getTeams(userId) {
        try {
            const teams = await User.findAll({
                where: { id: userId },
                include: [{
                    model: Team
                }]
            });
            return teams;
        }
        catch(err) {
            throw new Error("Error retrieving Teams");
        }
    }
    async createTeam({ userId, name }) {
        try {
            const team = await Team.create({
                name: name,
                createdBy: userId,
                Users: [{
                    userId: userId,
                    role: TEAM.ROLE.ADMIN
                }]
            }, {
                include: {
                    model: User
                }
            })
            return team;
        }
        catch(err) {
            throw new Error("Error retrieving Teams");
        }
    }
    async updateTeam({ userId, teamId, name }) {
        try {
            const [rows] = await Team.update(
                {name: name},
                {
                    where: {
                        id: teamId,
                        '$Users.id': userId
                    },
                    include: [{
                        model: User,
                    }],
                    returning: true
                }
            )
        }
        catch(err) {
            throw new Error("Error updating Team");
        }
    }
}

module.exports = UserService;
