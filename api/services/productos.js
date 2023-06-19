const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
// const pool = require('../../libs/postgresPool');
const { Product } = require('../../db/models/productos');

class ProductService {
  constructor() {
    // con pool
    // this.product = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err));
  }
  // generate() {
  //   const limit = 100;
  //   for (let i = 0; i <= limit; i++) {
  //     this.product.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: faker.commerce.price(),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }
  async find() {
    // pool
    // const query = 'SELECT * FROM  task';
    // const rta = await this.pool.query(query);
    // return rta.rows;

    // sequelize usando por defectos las queries
    const rta = await Product.findAll();
    return rta;
  }

  async findOne(id) {
    let productFinded = Product.findByPk(id);
    if (!productFinded) {
      throw boom.notFound('producto no encontrado');
    }
    if (productFinded.isBlock) {
      throw boom.conflict('producto no disponible');
    }
    return productFinded;
  }

  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }

  async update(id, changes) {
    const Product = await Product.findByPk(id);
    if (!Product) {
      throw boom.notFound('producto no encontrado');
    } else {
      await Product.update(changes);
      return {
        id,
        changes,
      };
    }
  }

  async delete(id) {
    const Product = await Product.findByPk(id);
    if (!Product) {
      throw boom.notFound('producto no encontrado');
    } else {
      await Product.destroy();
      return {
        id,
        message: 'producto eliminado',
      };
    }
  }
}
module.exports = ProductService;
