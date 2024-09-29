"use strict";
const settings = require("../config/settings")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.ENUM,
      values: settings.user.roleEnum,
      defaultValue: settings.user.role.member,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "user",
    });
  },
};
