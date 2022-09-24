"use strict";
global.classes = {};

const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    global.classes = {
      ...global.classes,
      [file.replace(".class.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}

module.exports.default = module.exports;
