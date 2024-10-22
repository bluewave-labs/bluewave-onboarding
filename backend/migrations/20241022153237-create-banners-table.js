'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('banners', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      closeButtonAction: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["no action", "open url", "open url in a new tab"]]
        }
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["top", "bottom"]]
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fontColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF"
      },
      backgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF"
      },
      bannerText: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('banners');
  }
};
