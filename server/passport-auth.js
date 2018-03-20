const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../database/index');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { // creating sessions
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    // 'user' from passport.deserializeUser is user ID
    console.log('user from passport.deserialize', user);
    const users = await db.getUserById(user);
    done(null, users[0]);
  });

  // LOCAL LOGIN STRATEGY
  passport.use('local-login', new LocalStrategy(async (username, password, cb) => {
    // 'username' here is ctx.request.body.username
    const userInfo = await db.checkCredentials(username);
    if (userInfo.length) {
      const user = userInfo[0];
      // 'password' here is ctx.request.body.password???
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          cb(err, null); // error thrown
        } else if (res === false) {
          cb(null, false); // password does not match
        } else {
          cb(null, user);
        }
      });
    } else {
      cb(null, false); // username does not exist
    }
  }));

  // LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (body, username, password, cb) => {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          cb(err, null);
        } else {
          const data = await db.createUser(body, username, hash);
          if (data === 'already exists!') {
            cb(data, null);
          } else {
            const userInfo = await db.checkCredentials(username);
            cb(null, userInfo);
          }
        }
      });
    },
  ));
};
