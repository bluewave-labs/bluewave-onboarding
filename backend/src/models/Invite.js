module.exports = (sequelize, DataTypes) => {
    const Invite = sequelize.define(
      "Invite",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        invitedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        invitedEmail: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        teamId: {
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

    Invite.associate = (models) => {
      Invite.belongsTo(models.User, {
        foreignKey: "invitedBy",
      });
  
      Invite.belongsTo(models.User, {
        foreignKey: "invitedEmail",
      });
  
      Invite.belongsTo(models.Team, {
        foreignKey: "teamId",
      });
    };
  
    return Invite;
  };
  