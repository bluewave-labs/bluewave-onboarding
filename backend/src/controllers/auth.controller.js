const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;
const Token = db.Token;
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; 
    const userId = req.user.id;

    await Token.create({ token, userId });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
