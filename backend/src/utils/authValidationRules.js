const { body } = require("express-validator");

const registerRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("surname").notEmpty().withMessage("Surname is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginRules = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgetPasswordRules = [
  body("email").isEmail().withMessage("Invalid email address"),
];

const resetPasswordRules = [
  body("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
];

module.exports = {
  registerRules,
  loginRules,
  forgetPasswordRules,
  resetPasswordRules,
};
