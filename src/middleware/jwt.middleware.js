router.use((req, res, next) => {
  if (req.path.search("auth/") > -1) {
    next();
  }
  else if (req.path.search("github/") > -1) {
    next();
  }
  else {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
          let errMsg = info ? info.message : err.message;
          if (errMsg.toLowerCase() == "jwt expired") {
            errMsg = messages.sessionExpiry;
          }
          next(createError(203, errMsg));
        }
        else if (user.jwt_token == null) {
          let errMsg = messages.sessionExpiry;
          next(createError(203, errMsg));
        }
        else {
          req.user = user;
          next();
        }
      }
    )(req, res, next);
  }
});
