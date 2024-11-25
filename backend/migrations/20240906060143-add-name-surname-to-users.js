/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "name", {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
    await queryInterface.addColumn("users", "surname", {
      type: Sequelize.STRING(50),
    });
    await queryInterface.removeColumn("users", "username");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "name");
    await queryInterface.removeColumn("users", "surname");
    await queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: ""
    });
  },
};
