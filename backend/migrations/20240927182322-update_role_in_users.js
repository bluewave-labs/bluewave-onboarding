const settings = require("../config/settings")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("users", "role", { transaction });
      await queryInterface.addColumn("users", "role", {
        type: Sequelize.ENUM,
        values: settings.user.roleEnum,
        defaultValue: settings.user.role.admin,
        allowNull: false,
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("users", "role", { transaction });
      await queryInterface.addColumn("users", "role", {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "user",
      }, { transaction });
    });
  },
};
