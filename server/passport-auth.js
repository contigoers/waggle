const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../database/index');

module.exports = () => {
  passport.serializeUser((user, done) => { // creating sessions
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const users = await db.getUserById(id);
    done(null, users[0]);
  });

  // LOCAL LOGIN STRATEGY
  passport.use('local-login', new LocalStrategy(async (username, password, cb) => {
    const userInfo = await db.checkCredentials(username);
    if (userInfo.length) {
      const user = userInfo[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          cb(err, null); // error thrown
        } else if (res === false) {
          cb(null, false); // password does not match
        }
        cb(null, user);
      });
    } else {
      cb(null, false); // username does not exist
    }
  }));

  // LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, username, password, cb) => {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        cb(err, null);
      } else {
        const data = await db.createUser(req.body, username, hash);
        if (data === 'already exists!') {
          cb(data, null);
        } else {
          const userInfo = await db.checkCredentials(username);
          cb(null, userInfo[0]);
        }
      }
    });
  }));
};
