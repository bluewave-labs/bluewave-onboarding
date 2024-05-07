import sequelize from '../config/database';
import User from './User';
import Popup from './Popup';
import Token from './Token';

// Define associations
User.hasMany(Popup, { foreignKey: 'createdBy' });
Popup.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Popup,
  Token
};
