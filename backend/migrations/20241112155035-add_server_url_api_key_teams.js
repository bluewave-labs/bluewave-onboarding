'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'serverUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('teams', 'apiKey', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('teams', 'serverUrl');
    await queryInterface.removeColumn('teams', 'apiKey');
  }
};
