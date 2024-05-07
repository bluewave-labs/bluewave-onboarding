import { Model, DataTypes } from 'sequelize';

export class User extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      hash: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'user'
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
    });
  }
}
