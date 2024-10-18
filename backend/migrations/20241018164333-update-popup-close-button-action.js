'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Popup', 'closeButtonAction', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Popup', 'closeButtonAction', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
