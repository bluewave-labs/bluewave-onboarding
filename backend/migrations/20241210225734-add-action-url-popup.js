"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("popup", "actionUrl", {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("popup", "actionUrl");
  },
};
