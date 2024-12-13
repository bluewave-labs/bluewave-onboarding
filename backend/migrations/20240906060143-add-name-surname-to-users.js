/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "users",
        "name",
        {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "users",
        "surname",
        {
          type: Sequelize.STRING(50),
        },
        { transaction }
      );
      await queryInterface.removeColumn("users", "username", { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("users", "name", { transaction });
      await queryInterface.removeColumn("users", "surname", { transaction });
      await queryInterface.addColumn(
        "users",
        "username",
        {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: "",
        },
        { transaction }
      );
    });
  },
};
