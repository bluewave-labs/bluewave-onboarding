const db = require('../models');
const { v4: uuidv4 } = require('uuid');

// Middleware to validate API ID
const validateApiId = async (req, res, next) => {
  const { apiId } = req.query;  // Assume API ID is sent in query params
  if (!apiId) {
    return res.status(400).json({ error: "API ID is required." });
  }

  try {
    const user = await db.User.findOne({ where: { apiId } }); // API ID must be in User model
    if (!user) {
      return res.status(403).json({ error: "Invalid API ID." });
    }

    req.user = user;  // Attach the user to the request for future use
    next();
  } catch (error) {
    return res.status(500).json({ error: "API ID validation failed." });
  }
};

// Middleware to generate client ID for each session
const generateClientId = (req, res, next) => {
  if (!req.session.clientId) {
    req.session.clientId = uuidv4();  // Generate new client ID and store in session
  }
  next();
};

module.exports = {
  validateApiId,
  generateClientId
};
