module.exports = (sequelize, DataTypes) => {
    const Invite = sequelize.define(
      "Invite",
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
        invitedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        invitee: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        team: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "teams",
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
        tableName: "invites",
        timestamps: false,
      },
    );
  
    return Invite;
  };
  