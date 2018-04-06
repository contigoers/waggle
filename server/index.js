const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');
const bcrypt = require('bcrypt');
const serve = require('koa-static');
const db = require('../database/index');
const { sendEmail } = require('./emailer');
const { mapKeys } = require('lodash');

const app = new Koa();

app.keys = ['supersecret'];
app.use(session(app));

const readFileThunk = src =>
  new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

app
  .use(serve(`${__dirname}/../react-client/dist`))
  .use(bodyParser());

require('./passport-auth')(passport);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }
  return ctx.throw(401, 'You must be logged in!');
  // ctx.redirect('/');  <---redirect to home page??
};

const randomString = (length) => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvqxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.put('/forgotpass', async (ctx) => {
  const { email } = ctx.request.body;
  if (!ctx.request.body) {
    ctx.body = {
      status: 204,
      message: 'No Request Body',
    };
  }
  if (!email) {
    ctx.body = {
      status: 204,
      message: 'No Email Address in Request Body',
    };
  }
  const emailDoesExist = await db.getUserByEmail(email);
  if (!emailDoesExist.length) {
    ctx.body = {
      status: 204,
      message: 'This Email Does Not Exists',
    };
  } else {
    const token = randomString(40);
    const emailData = {
      to: email,
      subject: 'Waggl Password Reset',
      text: `Please follow the link for instructions to reset your password: http://www.waggl.dog/resetpass/${token}`,
      html: `<p>Please use the link below for instructions to reset your password.</p><p>http://www.waggl.dog/resetpass/${token}</p>`,
    };
    try {
      await db.updateForgotPassword(email, token);
      sendEmail(emailData);
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.',
      };
    }
    ctx.body = {
      status: 200,
      message: `Email has been sent to ${ctx.request.body.email}`,
    };
  }
});

router.patch('/resetpass', async (ctx) => {
  const { password, token } = ctx.request.body;
  const hash = await bcrypt.hash(password, 10);
  const response = await db.updatePassword(token, hash);
  if (response) {
    ctx.status = 201;
    ctx.body = {
      status: 'success',
    };
  } else {
    ctx.throw(500);
  }
});

// mark dog status as 'adopted' - for organization access only
router.patch('/adopted', async (ctx) => {
  await db.markAsAdopted(ctx.request.body.dogId);
  const [dog] = await db.getDogById(ctx.request.body.dogId);

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    dog,
  };
});

// unmark dog status as 'adopted' - for organization access only
router.patch('/adopted/remove', async (ctx) => {
  await db.unmarkAsAdopted(ctx.request.body.dogId);
  const [dog] = await db.getDogById(ctx.request.body.dogId);

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    dog,
  };
});

// add new dog to organization - for organization access only
router.post('/createOrgDog', async (ctx) => {
  try {
    const dogId = await db.createDog(ctx.request.body);
    const newDog = await db.getDogById(dogId[0]);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      newDog: newDog[0],
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.patch('/updateDog', async (ctx) => {
  try {
    await db.updateDogInfo(ctx.request.body);
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
  const [dog] = await db.getDogById(ctx.request.body.id);

  ctx.body = {
    status: 200,
    dog,
  };
});

// add new org dog to favorites - for adopters
router.post('/favoriteDog', async (ctx) => {
  try {
    const favoriteDogs =
      await db.addFavoriteDog(ctx.request.body.adopterId, ctx.request.body.dogId);
    if (favoriteDogs === 'already exists!') {
      ctx.status = 409;
      ctx.body = {
        status: 'error',
        message: 'dog already exists under favorites!',
      };
    } else {
      const adopterFavoriteDogs = mapKeys(favoriteDogs, 'id');

      ctx.status = 201;
      ctx.body = {
        status: 'success',
        adopterFavoriteDogs,
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// remove org dog from favorites - for adopters
router.post('/favoriteDog/remove', async (ctx) => {
  try {
    const favoriteDogs =
      await db.removeFavoriteDog(ctx.request.body.adopterId, ctx.request.body.dogId);
    if (favoriteDogs === 'favorite does not exist!') {
      ctx.status = 409;
      ctx.body = {
        status: 'error',
        message: 'dog not does exist under favorites!',
      };
    } else {
      const adopterFavoriteDogs = mapKeys(favoriteDogs, 'id');

      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'dog has been removed from favorites!',
        adopterFavoriteDogs,
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// filtered search for dogs
router.post('/searchOrgDogs', async (ctx) => {
  try {
    let dogs = await db.searchOrgDogs(ctx.request.body);
    if (dogs.length) {
      let orgs = {};

      dogs = mapKeys(dogs, ({ id, org_id }) => {
        orgs[org_id] = 1;
        return id;
      });

      orgs = await db.getOrgsAfterDogs(Object.keys(orgs));
      orgs = mapKeys(orgs, 'id');

      const dogsAndOrgs = {
        dogs,
        orgs,
      };

      ctx.status = 201;
      ctx.body = {
        status: 'success',
        dogsAndOrgs,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        dogsAndOrgs: {
          dogs: {},
          orgs: {},
        },
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// render organization profile and dogs by org ID or org name
router.get('/orgInfo', async (ctx) => {
  try {
    const { orgId } = ctx.request.query;
    const [orgProfile] = await db.getOrgProfile(orgId);

    let dogs = await db.getOrgDogs(orgId);
    if (dogs.length) {
      dogs = mapKeys(dogs, 'id');
      const orgDogs = {
        dogs,
        org: orgProfile,
      };
      ctx.body = {
        status: 'success',
        orgDogs,
      };
    } else {
      ctx.body = {
        orgDogs: {
          dogs: {},
          org: {},
        },
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.get('/adopterInfo', async (ctx) => {
  try {
    const [adopterProfile] = await db.getAdopterProfile(ctx.request.query.adopterId);
    let favoriteDogs = await db.getFavoriteDogs(ctx.request.query.adopterId);
    if (favoriteDogs.length) {
      let orgs = {};

      favoriteDogs = mapKeys(favoriteDogs, ({ id, org_id }) => {
        orgs[org_id] = 1;
        return id;
      });

      orgs = await db.getOrgsAfterDogs(Object.keys(orgs));
      orgs = mapKeys(orgs, 'id');

      const adopterFavoriteDogs = {
        favoriteDogs,
        adopter: adopterProfile,
      };
      ctx.body = {
        status: 'success',
        adopterFavoriteDogs,
        orgs,
      };
    } else {
      ctx.body = {
        adopterFavoriteDogs: {
          favoriteDogs: {},
          adopter: adopterProfile,
        },
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.get('/randomDog', async (ctx) => {
  let dog;
  try {
    [dog] = await db.getRandomDog();
  } catch (err) {
    throw err;
  }
  const [org] = await db.getOrgProfile(dog.org_id);
  const dogsAndOrgs = {
    dogs: {
      [dog.id]: dog,
    },
    orgs: {
      [org.id]: org,
    },
  };

  ctx.status = 200;
  ctx.body = {
    dogsAndOrgs,
  };
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/callback', passport.authenticate('facebook'));

router.patch('/auth/facebook', async (ctx) => {
  console.log(ctx.request.body);
  const { username, email, id } = ctx.request.body;
  const users = db.checkCredentials(username, email);
  if (users.length) {
    let info;
    if (users.length === 2) {
      info = 'username and email taken';
      ctx.throw(418, info);
    }
    info = users[0].email === email ? 'email taken' : 'username taken';
    ctx.throw(418, info);
  }
  try {
    await db.updateFacebookUser(ctx.request.body);
  } catch (error) {
    console.log(error);
  }
  const [user] = db.checkCredentials(id);
  let adopterId;
  let name;
  if (user.org_id === 1) {
    const [adopter] = await db.getAdopterId(user.id);
    adopterId = adopter.id;
    ({ name } = adopter);
  } else {
    const [org] = await db.getOrgName(user.org_id);
    name = org.org_name;
  }
  const userInfo = {
    ...user,
    adopterId,
    name,
  };
  delete userInfo.password;
  delete userInfo.forgot_pw_link;
  ctx.body = {
    success: true,
    user: userInfo,
  };
});

router.post('/register', async ctx =>
  passport.authenticate('local-signup', async (error, user, info) => {
    if (error) {
      ctx.body = { error };
      ctx.throw(500);
    } else if (!user) {
      ctx.body = { success: false };
      ctx.throw(418, info);
    } else {
      let adopterId;
      let name;
      if (user.org_id === 1) {
        const [adopter] = await db.getAdopterId(user.id);
        adopterId = adopter.id;
        ({ name } = adopter);
      } else {
        const [org] = await db.getOrgName(user.org_id);
        name = org.org_name;
      }
      const userInfo = {
        ...user,
        adopterId,
        name,
      };
      delete userInfo.password;
      delete userInfo.forgot_pw_link;
      ctx.body = {
        success: true,
        user: userInfo,
      };
      return ctx.login(user);
    }
  })(ctx));

router.get('/login/check', async (ctx) => {
  if (ctx.state.user) {
    const { user } = ctx.state;
    let adopterId;
    let name;
    if (user.org_id === 1) {
      const [adopter] = await db.getAdopterId(user.id);
      adopterId = adopter.id;
      ({ name } = adopter);
    } else {
      const [org] = await db.getOrgName(user.org_id);
      name = org.org_name;
    }
    const userInfo = {
      ...user,
      adopterId,
      name,
    };
    delete userInfo.password;
    delete userInfo.forgot_pw_link;
    ctx.body = { user: userInfo };
    return ctx.login(userInfo);
  }
  ctx.body = {
    status: 200,
    msg: 'not logged in',
  };
});

router.post('/login', async ctx =>
  passport.authenticate('local-login', async (error, user, info) => {
    if (error) {
      ctx.body = { error };
      ctx.throw(500, 'unknown error');
    } else if (!user) {
      ctx.body = { success: false };
      ctx.throw(401, info);
    } else {
      let adopterId;
      let name;
      if (user.org_id === 1) {
        const [adopter] = await db.getAdopterId(user.id);
        adopterId = adopter.id;
        ({ name } = adopter);
      } else {
        const [org] = await db.getOrgName(user.org_id);
        name = org.org_name;
      }
      const userInfo = {
        ...user,
        adopterId,
        name,
      };
      delete userInfo.password;
      delete userInfo.forgot_pw_link;
      ctx.body = {
        success: true,
        user: userInfo,
      };
      return ctx.login(user);
    }
  })(ctx));

router.post('/logout', isLoggedIn, async (ctx) => {
  await ctx.logout();
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    message: 'You have been logged out successfully!',
  };
});

// posts a message to the database and returns the complete database object (with timestamp)
router.post('/messages/post', async (ctx) => {
  const { senderId } = ctx.request.body;
  const { recipientId } = ctx.request.body;
  const { dogName } = ctx.request.body;
  const msg = ctx.request.body.message;
  let message;
  try {
    [message] = await db.addMessage(senderId, recipientId, msg, dogName);
  } catch (error) {
    ctx.throw(500);
  }
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    message,
  };
});

// marks a message as deleted in database
router.patch('/messages/delete', async (ctx) => {
  await db.deleteMessage(ctx.request.body.messageId);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
  };
});

// gets messages between two users
router.get('/messages/fetch', async (ctx) => {
  const { userId } = ctx.request.query;
  const { contactId } = ctx.request.query;
  const messages = await db.getMessagesForChat(userId, contactId);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    messages,
  };
});

// marks all user's messages from contact as read
router.patch('/messages/read', async (ctx) => {
  await db.markAllRead(ctx.request.body.userId, ctx.request.body.contactId);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
  };
});

// gets list of adopter contacts and associated dogs for an organization
router.get('/contacts/org', async (ctx) => {
  const contacts = await db.getOrgContacts(ctx.request.query.id);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    contacts,
  };
});

router.get('/contacts/adopter', async (ctx) => {
  const contacts = await db.getAdopterContacts(ctx.request.query.id);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    contacts,
  };
});

router.get('/searchDogById', async (ctx) => {
  const { id } = ctx.request.query;
  let dog;
  try {
    [dog] = await db.getDogById(id);
  } catch (err) {
    throw err;
  }
  if (dog) {
    const [org] = await db.getOrgProfile(dog.org_id);
    const dogsAndOrgs = {
      dogs: {
        [dog.id]: dog,
      },
      orgs: {
        [org.id]: org,
      },
    };

    ctx.status = 200;
    ctx.body = {
      dogsAndOrgs,
    };
  } else {
    ctx.body = {
      dogsAndOrgs: {
        dogs: {},
        orgs: {},
      },
    };
  }
});

router.get('/checkLink', async (ctx) => {
  const { token } = ctx.request.query;
  const response = await db.checkLinkExists(token);
  if (response.length) {
    ctx.status = 201;
    ctx.body = {
      status: 'success',
    };
  } else {
    ctx.throw(500);
  }
});

router.post('/imageUpload', (ctx) => {
  if (ctx.request.url === '/imageUpload') {
    ctx.status = 201;
    ctx.body = {
      status: 'success',
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Sorry, an error has occurred.',
    };
  }
});


router.get('/*', async (ctx) => {
  ctx.body = await readFileThunk(path.join(__dirname, '../react-client/dist/index.html'));
});


app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
