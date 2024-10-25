export const URL_REGEX = /[(http(s)?)?://(www\.)?a-zA-Z0-9@:%\._+~#=]{2,256}\.[a-z]{2,6}\b([-\d@:%_+\.~#?&//=]*)/gi;

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
        autoIncrement: true,
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
      validate: {
        orderWithinRange() {
          if (this.order > this.id) {
            throw new Error('Order can\'t be bigger than the number of items')
          }
        }
      }
    }
  );

  Link.associate = (models) => {
    Link.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Link;
};
