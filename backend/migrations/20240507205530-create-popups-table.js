'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('popups', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    header: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.DataTypes.ENUM('top', 'bottom'),
      allowNull: false,
    },
    url: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    actionButtonText: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    appearance: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
    settings: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('popups');
}