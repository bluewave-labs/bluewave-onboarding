const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User'); 

const Popup = sequelize.define('Popup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  closeButtonAction: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['no-action', 'open-url', 'close-popup', 'open-url-new-tab']],
    },
  },
  popupSize: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['small', 'medium', 'large']],
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
    defaultValue: '#FFFFFF',
  },
  headerColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
  textColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
  buttonBackgroundColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
  buttonTextColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'popup'
});

// Establishing the association
Popup.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// Syncing the model
Popup.sync().then(() => {
  console.log('Popup table created');
});

module.exports = Popup;
