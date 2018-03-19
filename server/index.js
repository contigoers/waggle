const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const randomPuppy = require('random-puppy');
const db = require('../database/index');

const app = new Koa();

app
  .use(serve(`${__dirname}/../react-client/dist`))
  .use(bodyParser())
  .use(router.routes());

router.get('/picture', async (ctx) => {
  await randomPuppy()
    .then((url) => {
      ctx.body = url;
    });
});

router.post('/createOrgDog', async (ctx) => {
  try {
    const dog = await db.createDog(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      dog,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.post('/addFaveDog', async (ctx) => {
  try {
    await db.addFavoriteDog(ctx.request.body.adopterId, ctx.request.body.dogId);
    const faveDog = await db.getDogById(ctx.request.body.dogId);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      faveDog,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// for now this does not use bcypt/oauth/passport, will address later
router.post('/register', async (ctx) => {
  const hash = ctx.request.body.password; // need to fix later
  try {
    const data = await db.createUser(ctx.request.body, ctx.request.body.username, hash);
    if (data === 'already exists!') {
      ctx.status = 409;
      ctx.body = {
        status: 'error',
        message: 'username already exists!',
      };
    } else {
      const users = await db.checkCredentials(ctx.request.body.username);
      const userInfo = users[0];
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        userInfo,
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

// render organization profile and dogs by org ID or name
router.get('/orgInfo/:type/:data', async (ctx) => {
  const query = await ctx.params;
  // type will be either orgName or orgId
  let orgId;
  if (query.type === 'orgName') {
    orgId = await db.searchOrgsByName(query.data);
  } else if (query.type === 'orgId') {
    orgId = +query.data;
  }
  const orgProfile = await db.getOrgProfile(orgId);
  const orgDogs = await db.getOrgDogs(orgId);
  ctx.body = {
    status: 'success',
    orgProfile,
    orgDogs,
  };
});

router.get('/adopterInfo', async (ctx) => {
  try {
    const adopterProfile = await db.getAdopterProfile(ctx.request.query.adopterId);
    const adopterFavoriteDogs = await db.getFavoriteDogs(ctx.request.query.adopterId);
    ctx.body = {
      status: 'success',
      adopterProfile,
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

// filtered search for specific dogs within an organization
router.post('/searchOrgDogs', async (ctx) => {
  const query = ctx.request.body;
  // const test = {
  //   orgId: query.orgId,
  // };
  try {
    const dogs = await db.searchOrgDogs(query);
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
        message: 'No dogs in this organization!',
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

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
