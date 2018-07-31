'use strict';

const fileSystem = require('fs');
const path = require('path');
const converter = require('./converter')

function convertToPug(args) {
  const paths = parseArguments(args);
  handlePaths(paths);
}

function parseArguments(args) {
  let paths = [];

  for (const arg of args) {
    switch (arg) {
      case '-h':
      case '--help':
        help();
        process.exit(0);
        break;

      case '-v':
      case '--version':
        version();
        process.exit(0);
        break;

      default:
        if (arg.startsWith('-')) {
          console.log(`Error: unrecognized option '${arg}'`);
          process.exit(1);
        }
        paths.push(arg);
        break;
    }
  }

  return paths;
}

function handlePaths(paths) {
  let errors = [];
  let pendingPaths = paths.slice();

  function handlePath(filePath) {
    fileSystem.stat(filePath, (error, info) => {
      if (error) {
        errors.push(error);
      } else if (info.isDirectory()) {
        handleDirectory(filePath);
      } else {
        handleFile(filePath);
      }
    });
  }

  function handleDirectory(filePath) {
    fileSystem.readdir(filePath, (error, children) => {
      if (error) {
        errors.push(error);
      } else {
        const filteredChildren = children
          .map(child => path.join(filePath, child));
        pendingPaths.unshift(...filteredChildren);
      }
      handleNext();
    });
  }

  function handleFile(filePath) {
    if (!isJade(filePath)) {
      handleNext();
      return;
    }

    const dirName = path.dirname(filePath);
    const baseName = path.basename(filePath, '.jade');
    const outputPath = path.join(dirName, baseName + '.pug');
    console.log(`${filePath} → ${outputPath}`);
    fileSystem.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        errors.push(error);
        handleNext();
        return;
      }
      const resultCode = safeConvert(filePath, data);
      fileSystem.writeFile(outputPath, resultCode, (error) => {
        if (error) {
          errors.push(error);
        }
        handleNext();
      });
    });
  }

  function handleNext() {
    if (pendingPaths.length > 0) {
      const nextPath = pendingPaths.shift();
      if (!nextPath) {
        throw new Error('Expected a next path.');
      }
      handlePath(nextPath);
    }
  }

  handleNext();
}

function isJade(path) {
  return path.endsWith('.jade')
}

function safeConvert(name, code) {
  try {
    return converter.convert(code);
  } catch (error) {
    console.error(`${name}: ${error.stack}`);
    process.exit(1);
    throw new Error();
  }
}

function version() {
  const pkg = require('../package.json');
  const version = pkg.version;
  console.log(`v${version}`);
}

function help() {
  console.log(`${basename(process.argv[1])} PATH [PATH …]`);
  console.log();
  console.log('Convert your Jade templates to Pug templates.');
  console.log();
  console.log('OPTIONS');
  console.log();
  console.log('-h, --help               Display this help message.');
  console.log('-v, --version            Display the version.')
  console.log();
  console.log('EXAMPLES');
  console.log();
  console.log('# Convert a .jade file to a .pug file.');
  console.log('$ convert-to-pug template.jade');
  console.log();
  console.log('# Convert all .jade files in a directory.');
  console.log('$ convert-to-pug views/');
}

module.exports = {
  convertToPug
};
