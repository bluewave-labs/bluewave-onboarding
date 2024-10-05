const { validateHexColor } = require('../utils/guideHelpers');
const { validateCloseButtonAction, validatePopupSize } = require('../utils/popup.helper');

module.exports = (sequelize, DataTypes) => {
  const Popup = sequelize.define(
    "Popup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      closeButtonAction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidAction(value) {
            if (!validateCloseButtonAction(value)) {
              throw new Error('Invalid close button action');
            }
          },
        },
      },
      popupSize: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidPopupSize(value) {
            if (!validatePopupSize(value)) {
              throw new Error('Invalid popup size');
            }
          },
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      actionButtonText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headerBackgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'headerBackgroundColor');
          },
        },
      },
      headerColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'headerColor');
          },
        },
      },
      textColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'textColor');
          },
        },
      },
      buttonBackgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'buttonBackgroundColor');
          },
        },
      },
      buttonTextColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
        validate: {
          isHexColor(value) {
              validateHexColor(value, 'buttonTextColor');
          },
        },
      },
      header: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      content: {
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
      tableName: "popup",
      timestamps: false,
    },
  );

  Popup.associate = (models) => {
    Popup.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Popup;
};
