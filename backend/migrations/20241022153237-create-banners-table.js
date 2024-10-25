/** @type {import('sequelize-cli').Migration} */
const { validateHexColor, validateActionButton } = require('../src/utils/guide.helper');
const { validatePositionWrapper } = require('../src/utils/banner.helper');
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
          isValidAction(value) {
            validateActionButton(value);
          },
        }
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isValidPosition(value) {
            validatePositionWrapper(value);
          },
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fontColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'fontColor');
          },
        }
      },
      backgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'fontColor');
          },
        }
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
    });

    await queryInterface.addIndex('banners', ['position']);
    await queryInterface.addIndex('banners', ['created_by']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('banners');
  }
};
