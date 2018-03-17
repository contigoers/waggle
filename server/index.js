const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();

app
  .use(serve(`${__dirname}/../react-client/dist`))
  .use(bodyParser())
  .use(router.routes());

router.get('/test', (ctx, next) => {
  ctx.body = { message: 'hello' };
  next();
});

router.post('/test', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.status = 201;
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});
