import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
