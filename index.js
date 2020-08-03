const fs = require('fs');

// FIXME: IMPLEMENT!!!!

const OUTPUT_DIR = 'site';

fs.mkdir(`./${OUTPUT_DIR}`, err => {
  if (err) {
    throw err;
  }

  console.log('Directory created');
});
