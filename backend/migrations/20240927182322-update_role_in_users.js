"use strict";
const settings = require("../config/settings")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "role");
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: settings.user.role.member
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "role");
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "user",
    });
  },
};
