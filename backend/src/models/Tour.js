const {
  validateTriggeringFrequency,
  validatePageTargeting,
  validateTheme,
} = require("../utils/tour.helper");

module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define(
    "Tour",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statusActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pageTargeting: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validatePageTargeting(value)) {
              throw new Error("Invalid page targeting value");
            }
          },
        },
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateTheme(value)) {
              throw new Error("Invalid theme value");
            }
          },
        },
      },
      triggeringFrequency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateTriggeringFrequency(value)) {
              throw new Error("Invalid triggering frequency");
            }
          },
        },
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
      tableName: "tours",
      timestamps: false,
    }
  );

  Tour.associate = (models) => {
    Tour.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Tour;
};
