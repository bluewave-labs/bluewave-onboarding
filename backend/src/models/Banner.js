import { validateHexColor, isHexColor } from '../utils/guideHelpers';

module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        closeButtonAction: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [["no action", "open url", "open url in a new tab"]],
            },
          },
          position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [["top", "bottom"]],
            },
          },
          url: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          fontColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#FFFFFF",
            validate: {
              isHexColor(value) {
                  validateHexColor(value, 'fontColor');
              },
            },
          },
          backgroundColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#FFFFFF",
            validate: {
              isHexColor(value) {
                  validateHexColor(value, 'backgroundColor');
              },
            },
          },
          bannerText: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
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
            tableName: "banners",
            timestamps: false,
        },
    );

    Banner.associate = (models) => {
        Banner.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
    };
    return Banner;
};

