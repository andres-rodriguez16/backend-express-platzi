const { Strategy, ExtractJwt } = require('passport-jwt');
const { jsonSecret } = require('../../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jsonSecret,
};
const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
module.exports = jwtStrategy;
