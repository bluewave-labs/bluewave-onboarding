'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'apiKey', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.addColumn('teams', 'serverUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('teams', 'apiKey')
    await queryInterface.removeColumn('teams', 'serverUrl')
  }
};
