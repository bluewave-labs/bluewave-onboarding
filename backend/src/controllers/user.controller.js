const { Sequelize } = require("sequelize");
const db = require("../models");
const User = db.User


const getUsersList = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { rows: users, count: totalUsers } = await User.findAndCountAll({
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

    let returnObj = {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      totalUsers,
    };

    res.status(200).json(returnObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ where: { id : userId } });
  if (user){
    const { name, surname, email, role } = user;
    return res.status(200).json({ user: { name, surname, email, role } });
  }
  else{
    return res.status(400).json({ error: "User not found" });
  }
};


module.exports = { getUsersList, getCurrentUser };
