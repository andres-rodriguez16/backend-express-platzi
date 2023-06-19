const Joi = require('joi')

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const image = Joi.string()


const getCategoriesSchemas = Joi.object({
  id: id.required(),
})

const createCategoriesSchemas = Joi.object({
  name : name.required(),
  image : image.required(),
})

const upadateCategoriesSchemas = Joi.object({
  name,
  image
})

module.exports = {
  getCategoriesSchemas,
  createCategoriesSchemas,
  upadateCategoriesSchemas
}
