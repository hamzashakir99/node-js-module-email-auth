const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const { JWT_SECRET } = process.env;
ExtractJwt.fromBodyField("token");
const opts = { passReqToCallback: true, secretOrKey: JWT_SECRET };

module.exports = () => {
  opts.jwtFromRequest = (request) => {
    let token = null;
    if (request.header("authorization")) {
      token = request.header("authorization").trim().split(" ").pop();
    } else if (request.query.jwtToken) {
      token = request.query.jwtToken;
    }
    request.jwtToken = token;
    return token;
  };
  passport.use(
    new JwtStrategy(opts, async (req, jwt_payload, done) => {
      try {
        let customError = {
          message: "invalid token",
          status: 401,
        }
        if (!jwt_payload._id) {
          process.nextTick(() => {
            done({ status: 401, message: messages.InvalidToken }, null);
          });
        } else {
          if (jwt_payload.subject == dataConstraint.userType.users) {
            const user = await models["users"].findOne({ $and: [
              {
                _id: jwt_payload._id
              },
              {
                "jwt_token.token": req.jwtToken
              }
            ]}, {
              "jwt_token.token": 0
            });
            user ? done(null, user) : done(customError, false);
          }
        }
      } catch (error) {
        console.log(error)
        done(error, false);
      }
    })
  );
};