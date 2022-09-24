"use strict";
global.middleware = {};
const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    global.middleware = {
      ...global.middleware,
      [file.replace(".middleware.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}
module.exports.default = module.exports;