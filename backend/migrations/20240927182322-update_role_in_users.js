"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2, // tbg from config
    });
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "user",
    })
  },
};
