'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('tokens', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    expiresAt: {
      type: Sequelize.DataTypes.DATE,
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
  await queryInterface.dropTable('tokens');
}
