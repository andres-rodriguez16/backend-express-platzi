const { User, UsersSchemas } = require('./users');
const { Product, ProductsSchemas } = require('./productos');
const { Costumers, CostumersSchemas} = require('./costumers')

function setupModels(sequelize) {
  User.init(UsersSchemas, User.config(sequelize));
  Product.init(ProductsSchemas, Product.config(sequelize));
  Costumers.init(CostumersSchemas, Costumers.config(sequelize));

  Costumers.associate(sequelize.models);
}

module.exports = setupModels;
