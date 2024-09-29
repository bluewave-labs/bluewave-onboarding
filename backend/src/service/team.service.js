const settings = require("../../config/settings");
const db = require("../models");
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

    async updateTeam(userId, name) {
        try {
            const user = await User.findOne({
                where: {id: userId}
            });
            if(!settings.team.update.includes(user.role)) {
                throw new Error("User not authorized to update team details");
            }

            await Team.update({
                name: name
            }, {
                limit: 1
            });
        }
        catch(err) {
            throw new Error("Error updating Team");
        }
    }
    
    async removeUserFromTeam(userId, memberId) {
        try {
            const user = await User.findOne({
                where: {id: userId}
            });
            if(!settings.team.removeUser.includes(user.role)) {
                throw new Error("User not authorized to delete this user");
            }
            
            await User.destroy({
                where: {id: memberId}
            })
        }
        catch(err) {
            throw new Error("Error deleting User");
        }
    }

    async updateUserRole(userId, memberId, role) {
        try {
            const user = await User.findOne({
                where: {id: userId}
            });
            if(!settings.team.changeRole.includes(user.role)) {
                throw new Error("User not authorized to change role");
            }

            await User.update({
                role: settings.user.role[role]
            }, {
                where: { id: memberId }
            })
        }
        catch(err) {
            throw new Error("Error deleting User");
        }
    }
}

module.exports = TeamService;
