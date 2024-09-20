const db = require("../models");
const { TEAM } = require("../utils/constants");
const Invite = db.Invite;
const Team = db.Team;
const User = db.User;

class InviteService {
    // args to be made objects
    async sendInvite(userId, teamId, targetUserId, role) {
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
            // check if user is authrised using its role and role from config
            await Invite.create({
                invitedBy: userId,
                team: teamId,
                invitee: targetUserId,
                role: role
            });
        }
        catch(err) {
            throw new Error("Error sending Invite");
        }
    }
    async getRecievedInvites(userId) {
        try {
            
        }
        catch(err) {
            throw new Error("Error retrieving Team");
        }
    }
    async getSentInvites(userId, teamId) {
        try {

        }
        catch(err) {
            throw new Error("Error retrieving Teams");
        }
    }
    async acceptInvite(userId, inviteId) {
        try {
            
        }
        catch(err) {
            throw new Error("Error creating team");
        }
    }
    async rejectInvite(userId, inviteId) {
        try {

        }
        catch(err) {
            throw new Error("Error updating Team");
        }
    }
}

module.exports = InviteService;
