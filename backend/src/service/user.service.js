const settings = require("../../config/settings");
const db = require("../models");
const User = db.User;
const Invite = db.Invite;
const Token = db.Token;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

class UserService {
    async getUserById(userId) {
        try {
          return await User.findOne({
            where: { id: userId }
          });
        } catch(err) {
          throw new Error("Error retrieving User by ID");
        }
    }

    async getUsers({search, page, limit}) {
        try {
            const offset = (page - 1) * limit;

            return await User.findAndCountAll({
                where: {
                  [Sequelize.Op.or]: [
                    {
                      name: {
                        [Sequelize.Op.like]: `%${search}%`,
                      },
                    },
                    {
                      surname: {
                        [Sequelize.Op.like]: `%${search}%`,
                      },
                    },
                  ],
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
              });
        }
        catch(err) {
            throw new Error("Error retreiving users list");
        }
    }

    async updateUser(userId, inputs) {
      try {
        const details = {
          ...(inputs.name && { name: inputs.name }),
          ...(inputs.surname && { surname: inputs.surname }),
          ...(inputs.email && { email: inputs.email }),
        };

        await User.update({
          details,
        }, {
          where: { id: userId }
        });
      }
      catch(err) {
        throw new Error("Error updating user");
      }
    }

    async deleteUser(userId) {
      const transaction = await sequelize.transaction();
      try {
        const user = await User.findOne({
          where: { id: userId }
        });
        if(user.role == settings.user.role.admin) {
          const adminCount = await User.count({
            where: { role: settings.user.role.admin }
          });
          if(adminCount <= 1) {
            throw new Error("The team has only single admin and can't delete themselves");
          }
        }

        await User.destroy({
          where: { id: userId },
          transaction
        });
        await Invite.destroy({
          where: { invitedBy: userId },
          transaction
        });
        await transaction.commit();

        await Token.destroy({ 
          where: { userId } 
        });
      } catch (err) {
        console.log("🚀 ~ UserService ~ deleteUser ~ err:", err)
        await transaction.rollback();
        throw new Error("Error deleting user");
      }
      
    }
}

module.exports = UserService;
