"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("link", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      target: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      helperId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "helper_link",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    await queryInterface.addIndex("link", ["helperId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("link");
  },
};
