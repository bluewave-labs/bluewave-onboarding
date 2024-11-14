const { body } = require("express-validator");
const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z'-]+$/)
    .withMessage("Name can only contain letters, hyphens and apostrophes"),
  body("surname")
    .notEmpty()
    .withMessage("Surname is required")
    .matches(/^[A-Za-z'-]+$/)
    .withMessage("Name can only contain letters, hyphens and apostrophes"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>_\-=]/)
    .withMessage("Must contain one special character"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgetPasswordValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
];

const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Must be atleast 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Must contain one special character"),
];

module.exports = {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
};
