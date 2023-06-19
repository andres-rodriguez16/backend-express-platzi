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
    let productFinded = this.product.find((product) => product.id === id);
    if (!productFinded) {
      throw boom.notFound('producto no encontrado');
    }
    if (productFinded.isBlock) {
      throw boom.conflict('producto no disponible');
    }
    return productFinded;
  }
  async create(product) {
    const productCreate = {
      id: faker.string.uuid(),
      ...product,
    };
    this.product.push(productCreate);
    return productCreate;
  }

  async update(id, changes) {
    const indexProduct = this.product.findIndex((product) => product.id === id);
    if (indexProduct === -1) {
      throw boom.notFound('producto no encontrado');
    } else {
      const product = this.product[indexProduct];

      this.product[indexProduct] = {
        ...product,
        ...changes,
      };
      return this.product[indexProduct];
    }
  }

  async delete(id) {
    const indexProduct = this.product.findIndex((product) => product.id === id);
    if (indexProduct === -1) {
      throw boom.notFound('producto no encontrado');
    } else {
      this.product.splice(indexProduct, 1);
      return { id };
    }
  }
}
module.exports = ProductService;
