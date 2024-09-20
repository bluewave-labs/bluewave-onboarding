const db = require("../models");
const { TEAM } = require("../utils/constants");
const Team = db.Team;
const User = db.User;

class TeamService {
    async getTeamById(userId, teamId) {
        try {
            const team = await Team.findOne({
                where: { id: teamId },
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email'],
                    through: {
                        attributes: ['role']
                    }
                }],
            });
            const findUser = team.Users.find((user) => {
                return user.id == userId
            })
            if(!findUser) {
                throw new Error("User not part of team");
            }
            team.role = findUser.UserTeams.role;   // can be included
            return team;
        }
        catch(err) {
            throw new Error("Error retrieving Team");
        }
    }
    async getTeams(userId) {
        try {
            const teams = await User.findOne({
                where: { id: userId },
                include: [{
                    model: Team,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: ['role']
                    }
                }]
            });
            return teams;
        }
        catch(err) {
            throw new Error("Error retrieving Teams");
        }
    }
    async createTeam(userId, name) {
        try {
            const team = await Team.create({
                name: name,
                createdBy: userId,
            })
            await team.addUser(userId, {
                through: {
                    role: TEAM.ROLE.ADMIN
                }
            });
            return team;
        }
        catch(err) {
            throw new Error("Error creating team");
        }
    }
    async updateTeam(userId, teamId, name) {
        try {
            const team = await Team.findOne({
                where: {
                    id: teamId,
                },
                include: [{
                    model: User,
                    where: { id: userId }
                }]
            });
            if(!team) {
                throw new Error("Team not found or User not belong");
            }
            await team.update({
                name: name,
            })
        }
        catch(err) {
            throw new Error("Error updating Team");
        }
    }
}

module.exports = TeamService;
