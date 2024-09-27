const db = require("../models");
const User = db.User;
const Invite = db.Invite;
const sequelize = db.sequelize;

class UserService {
    async getUserById(userId) {
        try {
          return await User.findByPk.findByPk(userId);
        } catch(err) {
          throw new Error("Error retrieving User by ID");
        }
      }

    async getUsers({search, page, limit}) {
        try {
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

    async deleteUser(userId) {
      try {
        const transaction = await sequelize.transaction();
        await User.destroy({
          where: { id: userId },
          transaction
        });
        await Invite.destroy({
          where: { invitedBy: userId },
          transaction
        });
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw new Error("Error deleting user");
      }
      
    }
}

module.exports = UserService;
