const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string();
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const minPrice = Joi.number().integer();
const maxPrice = Joi.number().integer();

const createProductSchemas = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchemas = Joi.object({
  name: name,
  price: price,
  image: image,
  description,
  categoryId,
});

const getProductSchemas = Joi.object({
  id: id.required(),
});

const queryProductSchemas = Joi.object({
  limit,
  offset,
  price,
  minPrice,
  maxPrice: maxPrice.when('minPrice', {
    is: Joi.number().integer(),
    then: Joi.required(),
  }),
});
module.exports = {
  queryProductSchemas,
  createProductSchemas,
  updateProductSchemas,
  getProductSchemas,
};
