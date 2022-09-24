"use strict";
global.models = {};

const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js' && file.includes(".js")) {
    global.models = {
      ...global.models,
      [file.replace(".schema.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}




module.exports.default = module.exports;
