const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_EXPIRES_IN_1H } = require('./constants.helper');

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN_1H) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
