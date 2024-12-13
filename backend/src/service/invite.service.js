const settings = require("../../config/settings");
const db = require("../models");
const Invite = db.Invite;
const User = db.User;
const sequelize = db.sequelize;

class InviteService {
  async sendInvite(userId, invitedEmail, role) {
    const transaction = await sequelize.transaction();
    try {
      const invitedUser = await User.findOne({
        where: { email: invitedEmail },
        transaction,
      });
      if (invitedUser) {
        throw new Error("Invited User already exists in team");
      }

      const existingInvite = await Invite.findOne({
        where: { invitedEmail: invitedEmail },
        transaction,
      });

      if (existingInvite) {
        await existingInvite.update(
          {
            invitedBy: userId,
            role: settings.user.role[role],
          },
          { transaction }
        );
      } else {
        await Invite.create(
          {
            invitedBy: userId,
            invitedEmail: invitedEmail,
            role: settings.user.role[role],
          },
          { transaction }
        );
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error(`Error Sending Invite ~ ${err.message}`);
    }
  }

  async getAllInvites() {
    try {
      const invites = await Invite.findAll();
      return invites;
    } catch (error) {
      throw new Error("Failed to fetch invites");
    }
  }
}

module.exports = InviteService;
