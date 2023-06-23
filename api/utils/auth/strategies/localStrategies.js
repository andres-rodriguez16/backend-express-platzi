const { Strategy } = require('passport-local');
const UserService = require('../../../services/users');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByPk(email);
      if (!user) {
        done(Boom.unauthorized(), false);
      }
      const valitationPassword = bcrypt.compare(password, user.password);
      if (!valitationPassword) {
        done(Boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
