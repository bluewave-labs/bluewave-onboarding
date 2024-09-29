const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;
const Token = db.Token;
const Invite = db.Invite;
const sequelize = db.sequelize;
const { generateToken, verifyToken } = require("../utils/jwt");
const crypto = require('crypto');
const { TOKEN_LIFESPAN } = require('../utils/constants');
const { sendSignupEmail, sendPasswordResetEmail } = require('../service/email.service');

const register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const invite = await Invite.findOne({
      where: { invitedEmail: email }
    })
    if(!invite) {
      return res.status(400).json({ error: "No Invite Found" });
    }

    const transaction = await sequelize.transaction();
    await invite.destroy({ transaction });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, surname, email, password: hashedPassword, role: invite.role }, transaction);
    await transaction.commit();

    const token = generateToken({ id: newUser.id, email: newUser.email });

    await Token.create({ token, userId: newUser.id, type: 'auth' });

    await sendSignupEmail(newUser.email, newUser.name);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    await transaction.rollback();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await Token.destroy({ where: { userId: user.id, type: 'auth' } });

    const token = generateToken({ id: user.id, email: user.email });
    await Token.create({ token, userId: user.id, type: 'auth' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const dbToken = await Token.findOne({ where: { token, userId: decoded.id, type: 'auth' } });
    if (!dbToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    await dbToken.destroy();
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10);
    const expiresAt = new Date(Date.now() + TOKEN_LIFESPAN);
    await Token.create({ token: hash, userId: user.id, type: 'reset', expiresAt });

    await sendPasswordResetEmail(user.email, user.name, resetToken);
    res.status(200).json({ message: "Password reset token sent" });
  } catch (error) {
    console.error("Error in forget password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const dbToken = await Token.findOne({ where: { type: 'reset' } });

    if (!dbToken || new Date(dbToken.expiresAt) < new Date() || !(await bcrypt.compare(token, dbToken.token))) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const user = await User.findOne({ where: { id: dbToken.userId } });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    await dbToken.destroy();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, logout, forgetPassword, resetPassword };
