"use strict";
const { Model } = require("sequelize");
const { GuideType } = require("../utils/guidelog.helper");
module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statistics.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      guideType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: Object.keys(GuideType),
        },
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true,
          isPositive: true,
        },
      },
      change: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Statistics",
      indexes: [
        {
          name: "idx_statistics_createdAt",
          fields: ["createdAt"],
        },
        {
          name: "idx_statistics_updatedAt",
          fields: ["updatedAt"],
        },
        {
          name: "idx_statistics_guideType",
          fields: ["guideType"],
        },
        {
          name: "idx_statistics_views",
          fields: ["views"],
        },
        {
          name: "idx_statistics_change",
          fields: ["change"],
        },
      ],
    }
  );
  return Statistics;
};
