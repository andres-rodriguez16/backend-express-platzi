const Passport = require('passport');

const LocalStrategy = require('./strategies/localStrategies');

Passport.use(LocalStrategy);
