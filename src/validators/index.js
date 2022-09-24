global.dataValidator = {};
const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    global.dataValidator = {
      ...global.dataValidator,
      [file.replace(".validator.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}