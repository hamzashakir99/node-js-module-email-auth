const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file == 'google.strategy.passport.js') {
    require(path.join(__dirname, file))('google');
  }
  else if (file == 'jwt.strategy.passport.js') {
    require(path.join(__dirname, file))('jwt');
  }
  else {
    require(path.join(__dirname, file));
  }
}