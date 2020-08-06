const fs = require('fs');
const path = require('path');

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
      this._mkDirs([
        path.dirname(sourceFile)
      ]);

      const outputFile = this._evaluateOutputPath(sourceFile);

      path.extname(sourceFile) === '.md'
        ? this._htmlify(sourceFile, outputFile)
        : this._cpr(sourceDir, outputFile);

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

    return path.join(...split);
  }

  _htmlify(src, dest) {
    // FIXME: add md to html generation logic here
  }

  _cpr(src, dest) {
    // FIXME: implement recursive copy
  }

}

module.exports = Site;
