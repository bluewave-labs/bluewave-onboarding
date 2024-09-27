const db = require("../models");
const { TEAM } = require("../utils/constants");
const Invite = db.Invite;
const Team = db.Team;
const User = db.User;

class InviteService {
    // args to be made objects
    async sendInvite(userId, invitedEmail, role) {
        try {
            const findUser = team.Users.find((user) => user.id == userId);
            // check if user is authorised to send invite using its role and role from config

            const invitedUser = Users.find((user) => user.email == invitedEmail);
            if(invitedUser) {
                throw new Error("Invited User already exists in team")
            }
            await Invite.create({
                invitedBy: userId,
                invitedEmail: invitedEmail,
                role: role,
                status: 2, // should be added in default for member
            });
        }
        catch(err) {
            throw new Error("Error sending Invite");
        }
    }
    async acceptInvite(user) {
        try {
            const transaction = await db.sequelize.transaction();
            const invite = await Invite.findOne({
                where: {
                    invitedEmail: user.email,
                },
                include: {
                    model: Team,
                    as: 'team'
                },
            });
            if(!invite) {
                throw new Error("Invite not found");
            };
            await invite.team.addUser(user.id, {
                through: {
                    role: invite.role,
                },
                transaction
            });
            await invite.destroy({
                transaction
            })
            await transaction.commit();
        }
        catch(err) {
            await transaction.rollback();
            throw new Error("Error creating team");
        }
    }
}

module.exports = InviteService;
