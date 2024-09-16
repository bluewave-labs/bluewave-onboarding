const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { API_BASE_URL } = require('../utils/constants');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'localhost',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

const readHTMLFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

const sendEmail = async (to, subject, templateName, replacements) => {
  const templatePath = path.join(__dirname, `../templates/${templateName}.hbs`);
  const html = await readHTMLFile(templatePath);
  const template = handlebars.compile(html);
  const htmlToSend = template(replacements);

  const mailOptions = {
    to,
    subject,
    html: htmlToSend
  };

  await transporter.sendMail(mailOptions);
};

const sendSignupEmail = async (email, name) => {
  await sendEmail(email, 'Welcome to Our Service', 'signup', { name });
};

const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetLink = `${API_BASE_URL}reset-password?token=${resetToken}`;
  await sendEmail(email, 'Password Reset', 'resetPassword', { name, resetLink });
};

module.exports = { sendSignupEmail, sendPasswordResetEmail };
