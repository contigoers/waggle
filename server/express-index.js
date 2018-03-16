const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
app.use(bodyParser());

<<<<<<< HEAD:server/index.js
app.use(serve(`${__dirname}/../react-client/dist`));

app.listen(process.env.PORT, () => {
=======
const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());


//  app.get('/items', (req, res) => {
//    items.selectAll((err, data) => {
//       if (err) {
//         res.sendStatus(500);
//      } else {
//        res.json(data);
//      }
//    });
//  });

app.listen(process.env.PORT || 3000, () => {
>>>>>>> 0801e9fb3c6e6fc064b3eb61a475a70dd9a09e4a:server/express-index.js
  console.log(`listening on port ${3000}!`);
});
