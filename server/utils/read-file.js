const fsPromise = require("fs").promises;

const readFile = (path) => {
  return fsPromise.readFile(path, 'utf-8').then(data => JSON.parse(data))
};

module.exports = readFile;