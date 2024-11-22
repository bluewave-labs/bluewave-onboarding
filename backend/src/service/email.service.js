const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { API_BASE_URL } = require("../utils/constants.helper");
const db = require("../models");
const User = db.User;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "localhost",
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const readHTMLFile = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const file = fs.readFile(filePath, { encoding: "utf-8" });
      resolve(file);
    } catch (err) {
      reject(new Error(err));
    }
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const sendEmail = async (to, subject, templateName, replacements) => {
  const emailEnabled = process.env.EMAIL_ENABLE === "true";

  if (!emailEnabled) {
    console.log("Email sending is disabled.");
    return;
  }

  const templatePath = path.join(__dirname, `../templates/${templateName}.hbs`);
  const html = await readHTMLFile(templatePath);
  const template = handlebars.compile(html);
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions);
};

const sendSignupEmail = async (email, name) => {
  await sendEmail(email, "Welcome to Our Service", "signup", { name });
};

const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetLink = `${API_BASE_URL}reset-password?token=${resetToken}`;
  await sendEmail(email, "Password Reset", "resetPassword", {
    name,
    resetLink,
  });
};

module.exports = {
  sendSignupEmail,
  sendPasswordResetEmail,
  findUserByEmail,
  transporter,
};
