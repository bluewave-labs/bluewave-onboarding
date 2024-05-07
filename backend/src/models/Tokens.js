import { Model, DataTypes } from 'sequelize';

export class Token extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      timestamps: true,
      underscored: true,
    });
  }
}
