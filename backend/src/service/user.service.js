const db = require("../models");
const User = db.User

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
            throw new Error("Error retrieving User by ID");
        }
    }
}

module.exports = UserService;
