const { Sequelize } = require("sequelize");
const { body, validationResult } = require('express-validator');
const db = require("../models");
const User = db.User

const checkAtLeastOneField = (req, res, next) => {
  const { name, surname, picture } = req.body;

  if (name === undefined && surname === undefined && picture === undefined) {
    console.error("At least one of 'name', 'surname', or 'picture' must be provided");
    return res.status(400).json({
      updated: false,
      error: "Error, no value(s) provided to update"
    });
  }

  next();
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ updated: false, errors: errors.array() });
  }
  next();
};

const validateProfileUpdate = [
  body('name').optional().isString().trim().escape(),
  body('surname').optional().isString().trim().escape(),
  body('picture').optional().isURL().trim().escape(),
];

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
  const user = await User.findOne({ where: { id: userId } });
  if (user) {
    const { name, surname, email, role, profile_picture_url } = user;
    return res.status(200).json({ user: { name, surname, email, role, picture: profile_picture_url } });
  }
  else {
    return res.status(404).json({ error: "User not found" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, surname, picture } = req.body;

    const updateUserData = {
      ...(name && { name }),
      ...(surname && { surname }),
      profile_picture_url: picture || null,
    };

    await User.update(updateUserData, { where: { id: userId } });

    return res.status(200).json({ updated: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ updated: false, error: "Error occurred, please try again later!" });
  }
};

module.exports = {
  getUsersList,
  getCurrentUser,
  updateProfile,
  checkAtLeastOneField,
  validateProfileUpdate,
  handleValidationErrors
};  
