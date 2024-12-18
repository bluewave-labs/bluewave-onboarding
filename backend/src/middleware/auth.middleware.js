const { verifyToken } = require("../utils/jwt.helper");
const db = require("../models");
const Token = db.Token;
const User = db.User;

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    const dbToken = await Token.findOne({ where: { token, userId: decoded.id, type: 'auth' } });
    if (!dbToken) return res.status(401).json({ error: "Invalid token" });

    const createdAt = new Date(dbToken.createdAt);
    const expiresAt = new Date(createdAt.getTime() + parseInt(process.env.JWT_EXPIRATION_TIME, 10));
    if (new Date() > expiresAt) {
      await dbToken.destroy();
      return res.status(401).json({ error: "Token has expired" });
    }
    const user = await User.findOne({ where: { id: decoded.id } });
    if(!user) {
      return res.status(404).json("User not found");
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authenticateJWT;
