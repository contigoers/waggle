const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const items = require('../database-mysql');
const serve = require('koa-static');

const app = new Koa();
app.use(bodyParser());

app.use(serve(`${__dirname}/../react-client/dist`));

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${3000}!`);
});
