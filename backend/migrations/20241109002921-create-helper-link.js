"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("helper_link", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      headerBackgroundColor: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: "#F8F9F8",
      },
      linkFontColor: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: "#344054",
      },
      iconColor: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: "#7F56D9",
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });

    await queryInterface.addIndex('helper_link', ['createdBy']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("helper_link");
  },
};
