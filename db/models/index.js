const { User, UsersSchemas } = require('./users');
const { Product, ProductsSchemas } = require('./productos');

function setupModels(sequelize) {
  User.init(UsersSchemas, User.config(sequelize));
  Product.init(ProductsSchemas, Product.config(sequelize));
}

module.exports = setupModels;
