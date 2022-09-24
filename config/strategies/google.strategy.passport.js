module.exports = () => {
    passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/v1/auth/google/callback",
                scope: ["profile", "email"],
                passReqToCallback: true
            },
            async (req, accessToken, _refreshToken, profile, callback) => {
                try {
                    const { device_type, device_vendor, os, os_version, browser, browser_version } = req.session;
                    console.log(req.session.device_type)
                    let user = await schema.users.findOne({ "google_details.id": profile.id });
                    if (!user) {
                        const data = new schema.users({
                            "email": profile.email,
                            "email_verify": true,
                            "google_details.email": profile.email,
                            "google_details.access_token": accessToken,
                            "google_details.is_google_connected": true,
                            "google_details.id": profile.id,
                            "google_details.email_verified": profile.email_verified,
                            "google_details.verified": profile.verified
                        })
                        user = await data.save()
                    }
                    user = await schema.users.findOneAndUpdate({
                        "google_details.id": profile.id
                    }, {
                        $push: {
                            jwt_token: {
                                "login_date": new Date(),
                                "device_info": {
                                    device_type,
                                    device_vendor,
                                    os,
                                    os_version,
                                    browser,
                                    browser_version,
                                }
                            }
                        }
                    }, { new: true })
                    const token = await JWT.sign({ _id: profile.id, email: profile.email, provider: 'google', deviceIdentity: user.jwt_token[user.jwt_token.length - 1]._id.toString() }, process.env.JWT_SECRET, {
                        expiresIn: '2d',
                    });
                    await schema.users.updateOne({
                        "google_details.id": profile.id
                    }, {
                        $set: {
                            "jwt_token.$[outer].token": token,
                        }
                    }, {
                        arrayFilters: [{ "outer._id": user.jwt_token[user.jwt_token.length - 1]._id }],
                    })
                    return callback(null, {
                        ...user._doc,
                        jwt_token: token
                    });
                } catch (error) {
                    console.log(error)
                    callback(error);
                }
            }
        )
    );
};
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});