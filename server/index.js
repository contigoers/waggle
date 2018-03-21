const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');
const serve = require('koa-static');
const randomPuppy = require('random-puppy');
const db = require('../database/index');

const app = new Koa();

require('./passport-auth')(passport);

app.keys = ['supersecret'];
app.use(session(app));

app
  .use(serve(`${__dirname}/../react-client/dist`))
  .use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }
  return ctx.throw(401, 'You must be logged in!');
  // ctx.redirect('/');  <---redirect to home page
};

router.get('/picture', async (ctx) => {
  await randomPuppy()
    .then((url) => {
      ctx.body = url;
    });
});

// get all organizations and contact info
router.get('/allOrgInfo', async (ctx) => {
  const allOrgs = await db.getAllOrganizations();
  ctx.body = {
    status: 'success',
    allOrgs,
  };
});

// get all dogs
router.get('/allDogInfo', async (ctx) => {
  const allDogs = await db.getAllDogs();
  ctx.body = {
    status: 'success',
    allDogs,
  };
});

// get info on single dog by dogId
router.get('/dogInfo', async (ctx) => {
  const dog = await db.getDogById(ctx.request.query.dogId);
  ctx.body = {
    status: 'success',
    dog: dog[0],
  };
});

// mark dog status as 'adopted' - for organization access only
router.post('/adopted', async (ctx) => {
  await db.markAsAdopted(ctx.request.body.dogId);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
  };
});

// unmark dog status as 'adopted' - for organization access only
router.post('/adopted/remove', async (ctx) => {
  await db.unmarkAsAdopted(ctx.request.body.dogId);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
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
      newDog,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// add new org dog to favorites - for adopters
router.post('/favoriteDog', async (ctx) => {
  try {
    const data = await db.addFavoriteDog(ctx.request.body.adopterId, ctx.request.body.dogId);
    if (data === 'already exists!') {
      ctx.status = 409;
      ctx.body = {
        status: 'error',
        message: 'dog already exists under favorites!',
      };
    } else {
      const newFaveDog = await db.getDogById(ctx.request.body.dogId);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        faveDogs: data,
        newFaveDog: newFaveDog[0],
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
    const data = await db.removeFavoriteDog(ctx.request.body.adopterId, ctx.request.body.dogId);
    if (data === 'favorite does not exist!') {
      ctx.status = 409;
      ctx.body = {
        status: 'error',
        message: 'dog not does exist under favorites!',
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'dog has been removed from favorites!',
        faveDogs: data,
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
    const orgDogs = await db.getOrgDogs(orgId);
    ctx.body = {
      status: 'success',
      orgProfile: orgProfile[0],
      orgDogs: orgDogs[0],
    };
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
    const adopterProfile = await db.getAdopterProfile(ctx.request.query.adopterId);
    const adopterFavoriteDogs = await db.getFavoriteDogs(ctx.request.query.adopterId);
    ctx.body = {
      status: 'success',
      adopterProfile: adopterProfile[0],
      adopterFavoriteDogs,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// for now this does not use JWT/FBoauth
router.post('/register', passport.authenticate('local-signup'), (ctx) => {
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    user: ctx.state.user,
  };

  // const hash = ctx.request.body.password; // need to fix later
  // try {
  //   const data = await db.createUser(ctx.request.body, ctx.request.body.username, hash);
  //   if (data === 'already exists!') {
  //     ctx.status = 409;
  //     ctx.body = {
  //       status: 'error',
  //       message: 'username already exists!',
  //     };
  //   } else {
  //     const users = await db.checkCredentials(ctx.request.body.username);
  //     ctx.status = 201;
  //     ctx.body = {
  //       status: 'success',
  //       userInfo: users[0],
  //     };
  //   }
  // } catch (err) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     status: 'error',
  //     message: err.message || 'Sorry, an error has occurred.',
  //   };
  // }
});

// for now this does not use FB oauth/JWT
router.post('/login', passport.authenticate('local-login'), (ctx) => {
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    user: ctx.state.user,
  };
  // try {
  //   const users = await db.checkCredentials(ctx.request.body.username);
  //   if (users.length) {
  //     const userInfo = users[0];
  //     if (ctx.request.body.password === userInfo.password) { // need to fix later
  //       ctx.status = 201;
  //       ctx.body = {
  //         status: 'success',
  //         message: 'successful login!',
  //         userInfo,
  //       };
  //     } else {
  //       ctx.status = 401;
  //       ctx.body = {
  //         status: 'error',
  //         message: 'invalid password!',
  //       };
  //     }
  //   } else {
  //     ctx.status = 401;
  //     ctx.body = {
  //       status: 'error',
  //       message: 'username does not exist!',
  //     };
  //   }
  // } catch (err) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     status: 'error',
  //     message: err.message || 'Sorry, an error has occurred.',
  //   };
  // }
});

router.post('/logout', isLoggedIn, async (ctx) => {
  await ctx.logout();
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    message: 'You have been logged out successfully!',
  };
  // ctx.redirect('/');  <---redirect to home page
});

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
