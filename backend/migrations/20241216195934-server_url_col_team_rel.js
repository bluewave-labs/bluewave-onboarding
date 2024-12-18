'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'serverUrl', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('teams', 'serverUrl')
  }
};
