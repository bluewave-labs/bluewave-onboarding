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
          isIn: [["equals to", "is different from"]],
        },
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["default theme"]],
        },
      },
      triggeringFrequency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [[
            "Just once",
            "Once in every session",
            "Once every day",
            "Once every week",
            "Once every month",
            "Always"
          ]],
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
