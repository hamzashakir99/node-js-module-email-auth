"use strict";
global.actions = {};
const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    for(const innerActions of fs.readdirSync(path.join(__dirname, `./${file}/actions/`))){
      global.actions = {
        ...global.actions,
        [file]: {
          ...global.actions[file],
          [innerActions.replace('.action.js', '')]: require(path.resolve(
            __dirname,
             `./${file}/actions/${innerActions}`
          ))
        }
      }
    }
    for(const innerActions of fs.readdirSync(path.join(__dirname, `./${file}/routes/`))){
      for(const versions of fs.readdirSync(path.join(__dirname, `./${file}/routes/${innerActions}`))){
        app.use(`/api/${innerActions}`, require(path.resolve(__dirname, `./${file}/routes/${innerActions}/${versions}`)))
      }
    }
  }
}