"use strict";

const { GuideType } = require("../src/utils/guidelog.helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Statistics",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          guideType: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              isIn: Object.values(GuideType),
            },
          },
          views: {
            type: Sequelize.NUMBER,
            allowNull: false,
            defaultValue: 0,
            validate: {
              isInt: true,
              isPositive: true,
            },
          },
          change: {
            type: Sequelize.NUMBER,
            allowNull: false,
            defaultValue: 0,
            validate: {
              isFloat: true,
            },
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
        {
          transaction,
        }
      );
      await queryInterface.addIndex("Statistics", ["guideType"], {
        name: "idx_statistics_guideType",
        transaction,
      });
      await queryInterface.addIndex("Statistics", ["createdAt"], {
        name: "idx_statistics_createdAt",
        transaction,
      });
      await queryInterface.addIndex("Statistics", ["updatedAt"], {
        name: "idx_statistics_updatedAt",
        transaction,
      });
      await queryInterface.addIndex("Statistics", ["views"], {
        name: "idx_statistics_views",
        transaction,
      });
      await queryInterface.addIndex("Statistics", ["change"], {
        name: "idx_statistics_change",
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Statistics");
  },
};
