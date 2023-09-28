const Passport = require('passport');

const LocalStrategy = require('./strategies/localStrategies');
const jwtStrategy = require('./strategies/jwtStrategies');

Passport.use(LocalStrategy);
Passport.use(jwtStrategy);
