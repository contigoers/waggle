const randomPuppy = require('random-puppy');

randomPuppy()
  .then((url) => {
    console.log(url);
  });

//= > 'http://imgur.com/IoI8uS5'
