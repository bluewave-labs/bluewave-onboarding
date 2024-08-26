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
