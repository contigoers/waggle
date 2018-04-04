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
    const [user] = await db.checkCredentials(username);
    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return cb(err);
        } else if (!res) {
          return cb(null, res, 'incorrect password');
        }
        return cb(null, user);
      });
    } else {
      return cb(null, false, 'user not found');
    }
  }));

  // LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, username, password, cb) => {
    const [user] = await db.checkCredentials(username);
    if (!user) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          cb(err);
        } else {
          try {
            await db.createUser(req.body, username, hash);
          } catch (e) {
            return cb(e, null, 'error at creation');
          }
          const [userInfo] = await db.checkCredentials(username);
          cb(null, userInfo);
        }
      });
    } else {
      return cb(null, null, 'username already exists');
    }
  }));
};
