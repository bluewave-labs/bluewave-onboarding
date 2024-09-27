const db = require("../models");
const { TEAM } = require("../utils/constants");
const Invite = db.Invite;
const User = db.User;

class InviteService {
    // args to be made objects
    async sendInvite(userId, invitedEmail, role) {
        try {
            const user = await User.findOne({
                where: {id: userId},
            })
            // check if user is authorised to send invite using its role and role from config

            const invitedUser = User.findOne({
                where: {email: invitedEmail}
            })
            if(invitedUser) {
                throw new Error("Invited User already exists in team")
            }
            await Invite.create({
                invitedBy: userId,
                invitedEmail: invitedEmail,
                role: role, // converted using config
                status: 2, // should be added in default for member
            });
        }
        catch(err) {
            throw new Error("Error sending Invite");
        }
    }
}

module.exports = InviteService;
