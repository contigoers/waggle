const express = require('express');
const bodyParser = require('body-parser'); // eslint-disable-line

const items = require('../database-mysql');


const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));


//app.get('/items', (req, res) => {
//   items.selectAll((err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
//});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});

   