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
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        serverUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
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
  