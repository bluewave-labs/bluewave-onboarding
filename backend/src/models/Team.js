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
      Team.belongsToMany(models.User, { through: models.UserTeams, foreignKey: "teamId" });
    };
  
    return Team;
  };
  