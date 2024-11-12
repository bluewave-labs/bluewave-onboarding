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
        apiKey: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        serverUrl: {
          type: DataTypes.STRING(),
          allowNull: true,
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
  
    return Team;
  };
  