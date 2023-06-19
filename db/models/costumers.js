const { Model, DataTypes } = require('sequelize');

const COSTUMERS_TABLET = 'costumers';
const { USER_TABLET } = require('./users');

const CostumersSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW,
    unique: true,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLET,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Costumers extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey:'userId' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: COSTUMERS_TABLET,
      modelName: 'Costumers',
      timestamps: false,
    };
  }
}
module.exports = { COSTUMERS_TABLET, Costumers, CostumersSchemas };
