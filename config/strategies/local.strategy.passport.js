"use strict";

const { Strategy: LocalStrategy } = passportLocal;
module.exports = ()=>{
  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (_req, email, _password, done) => {
        try {
          const user = await schema.users.findOne({email});
          if (!user) {
            return done(null, false, { message: messages.noOneRegisteredWithEmail });
          }
          else{
            return done(null, user);
          }
        } catch (error) {
          console.log(error)
          return done(error);
        }
      }
    )
  );
};