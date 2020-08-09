const Site = require('./site.js');

new Site({
  title: 'Raging pointer',
  url: 'https://ragingpointer.com/',
  sourceDir: '_source/',
  outputDir: '_site/',
  templateDir: '_templates',
  stylesheet: '_css/main.css',
  indexOf: [
    '_source/blog/',
  ],
});
