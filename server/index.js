const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
<<<<<<< HEAD:server/koa-index.js
// const items = require('../database-mysql');
=======
>>>>>>> 131f2aaff96dcebead26f7c9b072ae7d4f02edb7:server/index.js
const serve = require('koa-static');
const randomPuppy = require('random-puppy');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

app.use(serve(`${__dirname}/../react-client/dist`));
console.log('hello koa');

router.get('/picture', (ctx, next) => {
  // ctx.router available
  randomPuppy()
    .then((url) => {
      ctx.body = url;
    });
});

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${3000}!`);
});
