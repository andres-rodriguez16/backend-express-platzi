const express = require('express');
const Passport = require('passport');

const CategoryService = require('../services/category');
const { checkRoles } = require('../middleweres/authHandler');
const validatorHandler = require('../middleweres/validatorHandles');
const {
  upadateCategoriesSchemas,
  createCategoriesSchemas,
  getCategoriesSchemas,
} = require('../schemas/categories');

const router = express.Router();
const service = new CategoryService();

router.get(
  '/',
  Passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'seller']),
  async (req, res, next) => {
    try {
      const category = await service.find();
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getCategoriesSchemas, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id, 'id');
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  Passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(createCategoriesSchemas, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  Passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategoriesSchemas, 'params'),
  validatorHandler(upadateCategoriesSchemas, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  Passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategoriesSchemas, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(201).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
