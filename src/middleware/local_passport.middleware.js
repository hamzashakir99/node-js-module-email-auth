exports.authenticate = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info)=>{
      if (err || !user) {
        console.log(err);
        console.log(info);
        next(createError(info && info.status ? info.status : 200, info.message, info));
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};
