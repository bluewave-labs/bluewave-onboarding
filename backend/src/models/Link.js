const { URL_REGEX } = require("../utils/link.helper");

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    "Link",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: URL_REGEX,
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      target: {
        type: DataTypes.STRING,
        validate: {
          isIn: ["_blank", "_self", "_parent", "_top"],
        },
        defaultValue: "_blank",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "link",
      timestamps: false,
    }
  );

  Link.associate = (models) => {
    Link.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Link;
};
