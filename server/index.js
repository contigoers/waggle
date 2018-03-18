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

router.post('/addOrgDog', async (ctx) => {
  try {
    const dog = await db.createDog(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: dog,
    };
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
        data: dogs,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
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
    const adopterProfile = await db.getAdopterProfile(ctx.request.query.adopterId);
    ctx.body = {
      status: 'success',
      adopterProfile,
    };
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
