const { Model, DataTypes } = require('sequelize');

const USER_TABLET = 'users';

const UsersSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW,
    unique: true,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLET,
      modelName: 'User',
      timestamps: false,
    };
  }
}
module.exports = { USER_TABLET, UsersSchemas, User };
