/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('popup_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      popupType: {
        type: Sequelize.ENUM('guide', 'tooltip', 'hotspot', 'checklist'),
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      showingTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

    await queryInterface.addIndex('popup_logs', ['userId']);
    await queryInterface.addIndex('popup_logs', ['popupType']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('popup_logs');
  }
};
