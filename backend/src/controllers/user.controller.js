const { Sequelize } = require("sequelize");
const db = require("../models");
const User = db.User;

class UserController {
  async getUsersList(req, res) {
    const { page = 1, limit = 10, search = "" } = req.query;

    try {
      const offset = (page - 1) * limit;
      const parsedLimit = parseInt(limit);
      const parsedOffset = parseInt(offset);

      const { rows: users, count: totalUsers } = await User.findAndCountAll({
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: `%${search}%` } },
            { surname: { [Sequelize.Op.like]: `%${search}%` } },
          ],
        },
        limit: parsedLimit,
        offset: parsedOffset,
      });

      const responseData = {
        users,
        totalPages: Math.ceil(totalUsers / parsedLimit),
        currentPage: parseInt(page),
        totalUsers,
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error in getUsersList:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { name, surname, email, role } = user;
      res.status(200).json({ user: { name, surname, email, role } });
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      res.status(500).json({ error: 'An error occurred while fetching the current user' });
    }
  }
}

module.exports = new UserController();