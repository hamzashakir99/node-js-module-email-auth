"use strict";
const files = fs.readdirSync(__dirname)
for (const file of files) {
    if (file != 'index.js') {
        require(path.resolve(
            __dirname,
            file
        ))
    }
}

module.exports.default = module.exports;
