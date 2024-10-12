const settings = require("../../config/settings");
const db = require("../models");
const Invite = db.Invite;
const User = db.User;

class InviteService {
    async sendInvite(userId, invitedEmail, role) {
        try {
            const invitedUser = await User.findOne({
                where: {email: invitedEmail}
            })
            if(invitedUser) {
                throw new Error("Invited User already exists in team")
            }

            const existingInvite = await Invite.findOne({
                where: { invitedEmail: invitedEmail }
            });

            if(existingInvite) {
                await existingInvite.update({
                    invitedBy: userId,
                    role: settings.user.role[role],
                })
            }
            else {
                await Invite.create({
                    invitedBy: userId,
                    invitedEmail: invitedEmail,
                    role: settings.user.role[role],
                });
            }
        }
        catch(err) {
            console.log("🚀 ~ InviteService ~ sendInvite ~ err:", err.message)
            throw new Error("Error Sending Invite");
        }
    }
}

module.exports = InviteService;
