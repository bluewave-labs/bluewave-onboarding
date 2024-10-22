const settings = require("../../config/settings");
const db = require("../models");
const Team = db.Team;
const User = db.User;
const Token = db.Token;
const Invite = db.Invite;
const sequelize = db.sequelize;

class TeamService {
    async getTeam() {
        try {
            const team = await Team.findOne({
                limit: 1,
            });
            const users = await User.findAll();
            return {team, users};
        }
        catch(err) {
            throw new Error("Error retrieving Team");
        }
    }

    async updateTeam(name) {
        try {
            await Team.update({
                name: name
            },{
                where: {}
            });
        }
        catch(error) {
            throw new Error("Error Updating Team");
        }
    }
    
    async removeUserFromTeam(userId, memberId) {
        const transaction = await sequelize.transaction();
        try {
            if(userId == memberId) {
                throw new Error("User can't remove itself through team list");
            }

            const member = await User.findOne({
                where: { id: memberId }
            })
            if(!member) {
                throw new Error("User to be removed not found")
            }
            
            await User.destroy({
                where: { id: memberId },
                transaction
            })
            await Token.destroy({ 
                where: { userId: memberId },
                transaction
            });
            await Invite.destroy({
                where: { invitedBy: memberId },
                transaction
            });

            await transaction.commit();
        }
        catch(err) {
            await transaction.rollback();
            throw new Error(`Error Deleting User ~ ${err.message}`);
        }
    }

    async updateUserRole(memberId, role) {
        console.log("🚀 ~ TeamService ~ updateUserRole ~ role:", role)
        try {
            const member = await User.findOne({
                where: { id: memberId }
            });
            if(!member) {
                throw new Error("User Not Found")
            }

            if(member.role == settings.user.role.admin && settings.user.role[role] != settings.user.role.admin) {
                const adminCount = await User.count({
                    where: { role: settings.user.role.admin }
                });
                if(adminCount <= 1) {
                    throw new Error("The team has only single admin and its role can't be changed");
                }
            }

            await User.update({
                role: settings.user.role[role]
            }, {
                where: { id: memberId }
            })
        }
        catch(err) {
            throw new Error(`Error Changing User Roles ~ ${err.message}`);
        }
    }
}

module.exports = TeamService;
