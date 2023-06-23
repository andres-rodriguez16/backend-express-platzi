const Boom = require('@hapi/boom');
const { apiKey } = require('../../config/config');
const checkApiKey = (req, res, next) => {
  // simpre en los headers los elementos que se reciban van a estar minusculas
  const apiKeyHeaders = req.headers['api'];
  if (apiKeyHeaders === apiKey) {
    next();
  } else {
    next(Boom.unauthorized('Invalid API Key'));
  }
};

module.exports = checkApiKey;
