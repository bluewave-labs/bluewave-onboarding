module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define(
      "Team",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        role: {
          type: DataTypes.INTEGER,       // to be made enum
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,       // to be made enum
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "teams",
        timestamps: false,
      },
    );

    Team.associate = (models) => {
      Team.belongsTo(models.User, { foreignKey: "createdBy" });
    };
  
    return Team;
  };
  