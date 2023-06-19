const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const phone = Joi.string();
const userId = Joi.number().integer();
const getCostumerSchemas = Joi.object({
  id: id.required(),
});

const createCostumerSchemas = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required()
});

const updateCostumerSchemas = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

module.exports = {
  getCostumerSchemas,
  createCostumerSchemas,
  updateCostumerSchemas,
};
