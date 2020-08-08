const site = require('./site.js');

new site({
  title: 'Raging Pointer',
  url: 'https://ragingpointer.com/',
  sourceDir: 'source/',
  outputDir: 'site/',
  indexOf: [
    'source/logs/',
  ]
});
