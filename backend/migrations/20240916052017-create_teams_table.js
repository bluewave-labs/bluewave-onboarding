const config = require("../config/config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "teams",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        { transaction }
      );

      await queryInterface.bulkInsert(
        "teams",
        [
          {
            name: config.defaultTeamName,
          },
        ],
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("teams", { transaction });
    });
  },
};
