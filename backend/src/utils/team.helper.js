const jwt = require('jsonwebtoken');

require('dotenv').config();

const encryptApiKey = (apiKey) => {
  return jwt.sign(apiKey, process.env.API_KEY_ENCRYPTION_KEY);
};

const decryptApiKey = (apiKey) => {
  try {
    return jwt.verify(apiKey, process.env.API_KEY_ENCRYPTION_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = { encryptApiKey, decryptApiKey };