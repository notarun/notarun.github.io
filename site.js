const fs = require('fs');
const path = require('path');

const snarkdown = require('snarkdown');

class Site {

  constructor(config) {
    this.title = config.title || 'New Site';
    this.url = config.url || 'localhost';
    this.sourceDir = config.sourceDir || 'source/';
    this.outputDir = config.site || 'site/';

    this._generate();
  }

  _generate() {
    this._mkDirs([
      this.sourceDir,
      this.outputDir,
    ]);

    this._findFiles(this.sourceDir).forEach(sourceFile => {
      const outputFile = this._evaluateOutputPath(sourceFile);

      this._mkDirs([
        path.dirname(outputFile)
      ]);

      path.extname(sourceFile) === '.md'
        ? this._htmlify(sourceFile, outputFile)
        : fs.copyFileSync(src, dest);

      console.log(sourceFile, ' -> ', outputFile);
    });
  }

  _mkDirs(dirs) {
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
        });
      }
    });
  }

  _findFiles(dir, files = []) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
      const direntPath = path.join(dir, dirent.name);

      dirent.isDirectory()
        ? this._findFiles(direntPath, files)
        : files.push(direntPath);
    });

    return files;
  }

  _evaluateOutputPath(filePath) {
    let split = filePath.split(path.sep);
    split[0] = this.outputDir;

    if (path.extname(filePath) === '.md') {
      let basename = path.basename(filePath, '.md');
      split[split.length - 1] = `${basename}.html`;
    }

    return path.join(...split);
  }

  _htmlify(src, dest) {
    const md = fs.readFileSync(src, {
      encoding: 'utf8'
    });

    const html = snarkdown(md);

    fs.writeFileSync(dest, html);
  }

}

module.exports = Site;
