module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("popup", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      closeButtonAction: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["no-action", "open-url", "close-popup", "open-url-new-tab"]],
        },
      },
      popupSize: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["small", "medium", "large"]],
        },
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actionButtonText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      headerBackgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
      },
      headerColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
      },
      textColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
      },
      buttonBackgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
      },
      buttonTextColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("popup");
  },
};
