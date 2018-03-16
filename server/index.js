const express = require('express');
const bodyParser = require('body-parser'); // eslint-disable-line
const randomPuppy = require('random-puppy');

// const items = require('../database');


const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
console.log('hello');

app.post('/image', (req, res) => {
  randomPuppy()
    .then((url) => {
      res.status(200).json({
        image: url,
      });
    });
});

// app.get('/items', (req, res) => {
//   items.selectAll((err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});
