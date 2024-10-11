'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profilePictures', {
      id: {
        type: Sequelize.INTEGER,
        primary: true,
        unique: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    await queryInterface.addConstraint('profilePictures', {
      fields: ['id', 'picture'], 
      type: 'unique',
      name: 'unique_profile_picture_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profilePictures');
  },
};
