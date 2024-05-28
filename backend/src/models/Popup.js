const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Popup = sequelize.define('Popup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  popupName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  headerText: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  headerTextColor:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  headerBg: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contentHtml: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  font:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fontColor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  action:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  actionButtonText:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  actionButtonColor:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  step: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue:1
  },
  domain: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  url:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'popup',
  timestamps: false // Disable timestamps
});

module.exports = Popup;

// {
//     no:1,
//     headerText: 'test header text',
//     headerTextColor: '#5F5014',
//     headerBg : '#4F9EBF',
//     contentHtml : 'tek content',
//     font: '14px',
//     fontColor: '#AAAAAA',
//     action : 'close',
//     actionButtonText: 'Kapat/Close',
//     actionButtonColor: '#CCCCCC'
// }
