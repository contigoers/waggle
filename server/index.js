const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');
const serve = require('koa-static');
const randomPuppy = require('random-puppy');
const db = require('../database/index');

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
  // ctx.redirect('/');  <---redirect to home page
};

router.get('/picture', async (ctx) => {
  ctx.body = await randomPuppy();
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
      newDog: newDog[0],
    };
  } catch (err) {
    console.log(err)
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


// filtered search for dogs
router.post('/searchOrgDogs', async (ctx) => {
  console.log(ctx.request.body);
  try {
    const obj = ctx.request.body;
    let query = '';
    for (const prop in obj) {
      query = `${query}(`;
      const array = obj[prop];
      console.log('gfd')
      if (typeof array[0] === 'string') {
        query += array.map(val => `dogs.${prop} = "${val}" or`);
      } else {
        query += array.map(val => `dogs.${prop} = ${val} or`);
      }
      const temp = query.split(' ');
      if (temp[temp.length - 1] === 'or') {
        temp.pop();
      }
      query = `${temp.join(' ')}) and `;
    }
    query = query.split(',').join(' ');
    let queryNew = query.split(' ');
    queryNew.splice(queryNew.length - 2, 2);
    queryNew = queryNew.join(' ');
    const dogs = await db.searchOrgDogs(queryNew);
    if (dogs.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        dogs,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'No dogs match this search criteria!',
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

// not being used for now except for passport debugging purposes
router.get('/user', (ctx) => {
  ctx.status = 200;
  ctx.body = {
    user: ctx.state.user,
  };
});

// for now this does not use JWT/FBoauth
router.post('/register', passport.authenticate('local-signup'), (ctx) => {
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    user: ctx.state.user,
  };
});

// for now this does not use FB oauth/JWT
router.post('/login', passport.authenticate('local-login'), (ctx) => {
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    user: ctx.state.user,
  };
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
