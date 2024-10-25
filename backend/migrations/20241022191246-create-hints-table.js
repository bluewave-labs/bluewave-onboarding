/** @type {import('sequelize-cli').Migration} */
const { validateHexColor } = require("../src/utils/guide.helper");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('hints', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      action: {
        type: Sequelize.ENUM('no action', 'open url', 'open url in a new tab'),
        allowNull: false
      },
      actionButtonUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      actionButtonText: {
        type: Sequelize.STRING,
        allowNull: true
      },
      targetElement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tooltipPlacement: {
        type: Sequelize.ENUM("top", "right", "bottom", "left"),
        allowNull: false
      },
      hintContent: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      header: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      headerBackgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
            validateHexColor(value, "headerBackgroundColor");
          },
        }
      },
      headerColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#000000",
        validate: {
          isHexColor(value) {
            validateHexColor(value, "headerBackgroundColor");
          },
        }
      },
      textColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#000000",
        validate: {
          isHexColor(value) {
            validateHexColor(value, "headerBackgroundColor");
          },
        }
      },
      buttonBackgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
            validateHexColor(value, "headerBackgroundColor");
          },
        }
      },
      buttonTextColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#000000",
        validate: {
          isHexColor(value) {
            validateHexColor(value, "headerBackgroundColor");
          },
        }
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
 
    await queryInterface.addIndex('hints', ['createdBy']);
    await queryInterface.addIndex('hints', ['action']);
    await queryInterface.addIndex('hints', ['tooltipPlacement']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('hints');
  }
};
