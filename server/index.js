const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const serve = require('koa-static');
const randomPuppy = require('random-puppy');
const db = require('../database/index');
require('./passport-auth')(passport);

const app = new Koa();
app.keys = ['supersecret'];

app
  .use(serve(`${__dirname}/../react-client/dist`))
  .use(bodyParser())
  .use(router.routes())
  .use(session(app))
  .use(passport.initialize())
  .use(passport.session());

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
router.post('/addFaveDog', async (ctx) => {
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
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        userInfo: users[0],
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

// for now this does not use bcypt/oauth/passport, will address later
router.post('/login', async (ctx) => {
  try {
    const users = await db.checkCredentials(ctx.request.body.username);
    if (users.length) {
      const userInfo = users[0];
      if (ctx.request.body.password === userInfo.password) { // need to fix later
        ctx.status = 201;
        ctx.body = {
          status: 'success',
          message: 'successful login!',
          userInfo,
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          status: 'error',
          message: 'invalid password!',
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        status: 'error',
        message: 'username does not exist!',
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

// TO DO
// filtered search for specific dogs within an organization
// router.post('/searchOrgDogs', async (ctx) => {
//   const query = ctx.request.body;
//   // const test = {
//   //   orgId: query.orgId,
//   // };
//   try {
//     const dogs = await db.searchOrgDogs(query);
//     if (dogs.length) {
//       ctx.status = 201;
//       ctx.body = {
//         status: 'success',
//         dogs,
//       };
//     } else {
//       ctx.status = 400;
//       ctx.body = {
//         status: 'error',
//         message: 'No dogs in this organization!',
//       };
//     }
//   } catch (err) {
//     ctx.status = 400;
//     ctx.body = {
//       status: 'error',
//       message: err.message || 'Sorry, an error has occurred.',
//     };
//   }
// });

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
