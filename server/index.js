const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');
const serve = require('koa-static');
const db = require('../database/index');
const { mapKeys } = require('lodash');

const app = new Koa();

app.keys = ['supersecret'];
app.use(session(app));

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

// get all organizations and contact info
// router.get('/allOrgInfo', async (ctx) => {
//   const allOrgs = await db.getAllOrganizations();
//   ctx.body = {
//     status: 'success',
//     allOrgs,
//   };
// });

// get all dogs
// router.get('/allDogInfo', async (ctx) => {
//   const allDogs = await db.getAllDogs();
//   ctx.body = {
//     status: 'success',
//     allDogs,
//   };
// });

// get info on single dog by dogId
// router.get('/dogInfo', async (ctx) => {
//   const dog = await db.getDogById(ctx.request.query.dogId);
//   ctx.body = {
//     status: 'success',
//     dog: dog[0],
//   };
// });

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
    const data = ctx.request.query;
    // type will be either orgName or orgId
    // value will either be the org's name or org's Id
    let orgId;
    if (data.type === 'orgName') {
      const orgInfo = await db.searchOrgsByName(data.value);
      orgId = orgInfo[0].id;
    } else if (data.type === 'orgId') {
      orgId = +data.value;
    }
    const orgProfile = await db.getOrgProfile(orgId);
    let dogs = await db.getOrgDogs(orgId);
    if (dogs.length) {
      dogs = mapKeys(dogs[0], 'id');
      const orgDogs = {
        dogs,
        org: orgProfile[0],
      };
      ctx.body = {
        status: 'success',
        orgDogs,
      };
    } else {
      ctx.body = {
        orgDogs: {
          dogs: {},
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
    console.log(err);
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

// not being used for now except for passport debugging purposes
// router.get('/user', (ctx) => {
//   ctx.status = 200;
//   ctx.body = {
//     user: ctx.state.user,
//   };
// });

// for now this does not use JWT/FBoauth
router.post('/register', passport.authenticate('local-signup'), (ctx) => {
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    user: ctx.state.user,
  };
});

router.post('/login', async ctx =>
  passport.authenticate('local-login', async (error, user, info) => { // eslint-disable-line
    if (error) ctx.body = { error };
    if (user === false) {
      ctx.body = { success: false, info };
      ctx.throw(401, info);
    } else {
      let adopterId;
      let username;
      if (ctx.state.user.org_id === 1) {
        const [adopter] = await db.getAdopterId(ctx.state.user.id);
        adopterId = adopter.id;
        username = adopter.name;
      } else {
        const [org] = await db.getOrgName(ctx.state.user.org_id);
        username = org.org_name;
      }
      const userInfo = {
        ...ctx.state.user,
        adopterId,
        name: username,
      };
      ctx.body = {
        success: true,
        user: userInfo,
      };
      return ctx.login(user);
    }
  })(ctx));

// for now this does not use FB oauth/JWT
// router.post('/login', passport.authenticate('local-login'), async (ctx) => {
//   let adopterId = null;
//   let userName = null;
//   if (ctx.state.user.org_id === 1) {
//     const [adopter] = await db.getAdopterId(ctx.state.user.id);
//     adopterId = adopter.id;
//     userName = adopter.name;
//   } else {
//     const [org] = await db.getOrgName(ctx.state.user.org_id);
//     userName = org.org_name;
//   }
//   const user = {
//     ...ctx.state.user,
//     adopterId,
//     name: userName,
//   };
//   console.log(ctx)
//   ctx.status = 201;
//   ctx.body = {
//     status: 'success',
//     user,
//   };
// });

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
  const fullMessage = await db.addMessage(senderId, recipientId, msg, dogName);
  const message = fullMessage[0];
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

// gets list of adopter contacts and associated dogs for an organization
router.get('/contacts/org', async (ctx) => {
  const contacts = await db.getOrgContacts(ctx.request.query.id);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    contacts,
  };
});

// gets list of organization contacts and associated dogs for an adopter
router.get('/contacts/adopter', async (ctx) => {
  const contacts = await db.getAdopterContacts(ctx.request.query.id);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    contacts,
  };
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

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(function* () { // eslint-disable-line
    this.redirect('/');
  });


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
