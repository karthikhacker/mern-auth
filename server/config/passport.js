const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/db');
const User = require('../models/user');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
module.exports = function(passport){
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findById(jwt_payload.id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));
}
