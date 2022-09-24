"use strict";
global.utils = {};

const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    global.utils = {
      ...global.utils,
      [file.replace(".util.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}

module.exports.default = module.exports;
