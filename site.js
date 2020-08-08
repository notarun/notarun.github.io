const fs = require('fs');
const path = require('path');

const snarkdown = require('snarkdown');

class Site {

  constructor(config) {
    this.title = config.title || 'New Site';
    this.url = config.url || 'localhost';
    this.sourceDir = config.sourceDir || 'source/';
    this.outputDir = config.site || 'site/';
    this.indexOf = config.indexOf || ['source/blog'];

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

      this._isMd(sourceFile)
        ? this._htmlify(sourceFile, outputFile)
        : fs.copyFileSync(sourceFile, outputFile);
    });

    this.indexOf.forEach(dir => {
      this._indexify(dir);
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

    if (this._isMd(filePath)) {
      const basename = path.basename(filePath, '.md');
      split[split.length - 1] = `${basename}.html`;
    }

    if (this._isDir(filePath)) {
      split.push('index.html');
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

  _isMd(filePath) {
    return path.extname(filePath) === '.md';
  }

  _isDir(path) {
    return fs.statSync(path).isDirectory();
  }

  _indexify(dir) {
    const indices = this._findFiles(dir)
      .filter(file => this._isMd(file))
      .map(file => this._extractMetadata(file));

    const outputPath = this._evaluateOutputPath(dir);

    // FIXME: Add a templating engine
    // const html = '';
    // fs.writeFileSync(outputPath, html);
  }

  _extractMetadata(mdFile) {
    let metadata = { title: '', basename: '' };

    const md = fs.readFileSync(mdFile, { encoding: 'utf8' });
    const comment = /<!--[^>]*-->/.exec(md) || null;

    if (comment) {
      const json = comment[0]
        .replace(/<!--/, '')
        .replace(/-->/, '');

      try {
        metadata = JSON.parse(json);
      } catch (e) {
        console.error(`${mdFile}: Invalid metadata format.`);
      }
    }

    return metadata;
  }

}

module.exports = Site;
