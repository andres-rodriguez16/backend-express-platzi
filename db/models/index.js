const { User, UsersSchemas } = require('./users');
const { Product, ProductsSchemas } = require('./productos');
const { Costumers, CostumersSchemas } = require('./costumers');
const { Category, CategoriesSchemas } = require('./category');

function setupModels(sequelize) {
  User.init(UsersSchemas, User.config(sequelize));
  Product.init(ProductsSchemas, Product.config(sequelize));
  Costumers.init(CostumersSchemas, Costumers.config(sequelize));
  Category.init(CategoriesSchemas, Category.config(sequelize));
  // asociaciones
  Product.associate(sequelize.models);
  User.associate(sequelize.models);
  Costumers.associate(sequelize.models);
  Category.associate(sequelize.models);
}

module.exports = setupModels;
