const Boom = require('@hapi/boom');
const { apiKey } = require('../../config/config');

const checkApiKey = (req, res, next) => {
  // simpre en los headers los elementos que se reciban van a estar en minusculas
  const apiKeyHeaders = req.headers['api'];
  if (apiKeyHeaders === apiKey) {
    next();
  } else {
    next(Boom.unauthorized('Invalid API Key'));
  }
};

const checkRoles = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(Boom.unauthorized('No tiene permisos de administrador'));
    }
  };
};

module.exports = { checkApiKey, checkRoles };
