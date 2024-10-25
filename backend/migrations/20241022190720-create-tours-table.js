const {
  validateTriggeringFrequency,
  validatePageTargeting,
  validateTheme,
} = require("../src/utils/tour.helper");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      statusActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pageTargeting: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validatePageTargeting(value)) {
              throw new Error("Invalid page targeting value");
            }
          },
        }
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateTheme(value)) {
              throw new Error("Invalid theme value");
            }
          },
        }
      },
      triggeringFrequency: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateTriggeringFrequency(value)) {
              throw new Error("Invalid triggering frequency");
            }
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

    await queryInterface.addIndex('tours', ['createdBy']);
    await queryInterface.addIndex('tours', ['statusActive']);
    await queryInterface.addIndex('tours', ['pageTargeting']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tours');
  }
};
