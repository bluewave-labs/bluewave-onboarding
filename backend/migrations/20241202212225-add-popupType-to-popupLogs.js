'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('popup_logs', 'guide_logs');

    await queryInterface.changeColumn('guide_logs', 'popupType', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('guide_logs', 'guideId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addIndex('guide_logs', ['userId'], {
      name: 'idx_userId',
    });
    await queryInterface.addIndex('guide_logs', ['guideId'], {
      name: 'idx_guideId',
    });
    await queryInterface.addIndex('guide_logs', ['popupType'], {
      name: 'idx_popupType',
    });
    await queryInterface.addIndex('guide_logs', ['userId', 'guideId', 'popupType'], {
      name: 'idx_userId_guideId_popupType',
      unique: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('guide_logs', 'popup_logs');

    await queryInterface.changeColumn('popup_logs', 'popupType', {
      type: Sequelize.ENUM('guide', 'tooltip', 'hotspot', 'checklist'),
      allowNull: false,
    });

    await queryInterface.removeColumn('popup_logs', 'guideId');

    await queryInterface.removeIndex('popup_logs', 'idx_userId');
    await queryInterface.removeIndex('popup_logs', 'idx_guideId');
    await queryInterface.removeIndex('popup_logs', 'idx_popupType');
    await queryInterface.removeIndex('popup_logs', 'idx_userId_guideId_popupType');
  },
};