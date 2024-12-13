/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "tours",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          statusActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          pageTargeting: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          theme: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          triggeringFrequency: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
        },
        { transaction }
      );
      await queryInterface.addIndex("tours", ["createdBy"], { transaction });
      await queryInterface.addIndex("tours", ["statusActive"], { transaction });
      await queryInterface.addIndex("tours", ["pageTargeting"], { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("tours", { transaction });
    });
  },
};
