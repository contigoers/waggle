const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const db = require('../database/index');

module.exports = () => {
  passport.serializeUser((user, done) => { // creating sessions
    if (user.username) {
      return done(null, user.username);
    }
    const username = `${user.name.givenName} ${user.name.familyName}`;
    return done(null, username);
  });
  passport.deserializeUser(async (username, done) => {
    const users = await db.getUserByUsername(username);
    done(null, users[0]);
  });

  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/callback',
    profileFields: ['id', 'email', 'address', 'name'],
  }, async (aToken, rToken, profile, cb) => {
    const username = `${profile.name.givenName} ${profile.name.familyName}`;
    const [user] = await db.getUserByUsername(username);
    if (!user) {
      await db.createFacebookUser(profile);
    }
    cb(null, profile);
  }));

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
    const users = await db.checkCredentials(username, req.body.email);
    if (users.length) {
      let info;
      if (users.length === 2) {
        info = 'username and email taken';
        return cb(null, null, info);
      }
      info = users[0].email === req.body.email ? 'email taken' : 'username taken';
      return cb(null, null, info);
    }
    if (req.body.type === 'organization') {
      const orgs = await db.getOrgByName(req.body.name);
      if (orgs.length) return cb(null, null, 'org name taken');
    }
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
  }));
};
