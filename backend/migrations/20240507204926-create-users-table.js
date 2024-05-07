'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hash: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    role: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'user'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
