const db = require("../models");
const { TEAM } = require("../utils/constants");
const Team = db.Team;
const User = db.User;

class TeamService {
    async getTeam() {
        try {
            const team = await Team.findOne({
                limit: 1,
            });
            const users = await Team.find();
            return {team, users};
        }
        catch(err) {
            throw new Error("Error retrieving Team");
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
    async updateTeam(userId, name) {
        try {
            const user = await User.findOne({
                where: {id: userId}
            });
            // check if user is authorized to update a team
            await Team.update({
                limit: 1
            }, {
                name: name
            });
        }
        catch(err) {
            throw new Error("Error updating Team");
        }
    }
    async removeMemberFromTeam(userId, memberId) {
        try {
            const user = await User.findOne({
                where: {id: userId}
            });
            const member = await User.findOne({
                where: {id: memberId}
            });
            // check if user is authorized to delete this user
            
            await User.destroy({
                where: {id: memberId}
            })
        }
        catch(err) {
            throw new Error("Error deleting User");
        }
    }
}

module.exports = TeamService;
