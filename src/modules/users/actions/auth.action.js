const usersClass = new classes["user"].UserClass(models["users"])


exports.checkUserName = async (req, res, next) => {
    try {
        const { user_name } = req.body;
        const document = await usersClass.getUserByUserName(user_name)
        if (document.length > 0) {
            await utils.res.response(res, messages.alreadyUserName, false, 200, null)
        }
        else {
            await utils.res.response(res, messages.success, true, 200, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password, device_type, device_vendor, os, os_version, browser, browser_version } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length > 0) {
            if (document[0].email_verify) {
                // ask password for the user
                if (await bcrypt.compare(password, document[0].password)) {
                    // check user has two factor or not
                    if (document[0].is_two_factor) {
                        await usersClass.updateTwoFactorVerify(document[0]._id, false)
                        // send two factor code
                        const code = randomString.generate({
                            length: 4,
                            charset: 'numeric'
                        });
                        await usersClass.updateActivationCode({ email, expireDate: moment().utc().add(2, 'm'), code })
                        utils["email"].twoFactorLoginCode(email, document[0].first_name, code).then().catch()
                    }
                    else {
                        // made two factor true
                        await usersClass.updateTwoFactorVerify(document[0]._id, true)
                    }
                    // Set jwt token object
                    const jwt_token = {
                        login_date: moment().utc().format(),
                        device_info: {
                            device_type,
                            device_vendor,
                            os,
                            os_version,
                            browser,
                            browser_version,
                        },
                    };
                    const profile = await usersClass.pushJWTToken(document[0]._id, jwt_token)
                    // Generate token
                    const token = await JWT.sign(
                        {
                            _id: profile._id,
                            email: profile.email,
                            date: moment().utc().format(),
                            deviceIdentity: profile.jwt_token[profile.jwt_token.length - 1]._id.toString(),
                            subject: dataConstraint.userType.users
                        }, process.env.JWT_SECRET, {
                        expiresIn: '2d',
                    });
                    await usersClass.updateUserJWTToken(profile._id, profile.jwt_token[profile.jwt_token.length - 1]._id.toString(), token)
                    let updatedObject = await utils.calculate.deleteKeys(profile, ['password', 'verification_code'])
                    updatedObject.jwt_token[updatedObject.jwt_token.length - 1] = {
                        ...updatedObject.jwt_token[updatedObject.jwt_token.length - 1],
                        token
                    }
                    await utils.res.response(res, messages.success, true, 200, updatedObject)
                } else {
                    await utils.res.response(res, messages.incorrectPassword, false, 200, null)
                }
            } else {
                await utils.res.response(res, messages.emailNotVerify, false, 202, null)
            }
        } else {
            await utils.res.response(res, messages.wrongCredentials, false, 200, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.verifyTwoFactorAuthentication = async (req, res, next) => {
    try {
        const { user } = req;
        const { code } = req.body;
        if (user.verification_code == code) {
            if (moment(user.expire_date).isAfter(moment().utc().format())) {
                await usersClass.updateTwoFactorVerify(user._id, true)
                await utils.res.response(res, messages.success, true, 200, null)
            } else {
                await utils.res.response(res, messages.codeExpired, false, 200, null)
            }
        } else {
            await utils.res.response(res, messages.invalidCode, false, 200, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        const { user, jwtToken } = req;
        const { all_devices } = req.body;
        await usersClass.removeToken(user._id, all_devices ? [] : jwtToken)
        await utils.res.response(res, messages.logoutUser, true, 200, null)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        const { user, jwtToken } = req;
        const { all_devices } = req.body;
        await usersClass.removeToken(user._id, all_devices ? [] : jwtToken)
        await utils.res.response(res, messages.logoutUser, true, 200, null)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length == 0) {
            const code = randomString.generate({
                length: 4,
                charset: 'numeric'
            });
            // bcrypt the password
            const genSalt = await bcrypt.genSalt(dataConstraint.saltRounds)
            const hashPassword = await bcrypt.hash(password, genSalt)
            const user = await usersClass.createUser({
                first_name,
                last_name,
                email,
                hashPassword,
                code,
                expireDate: moment().utc().add(2, 'm')
            })
            utils["email"].verifyEmailRegisterCode(email, first_name, code).then().catch()
            await utils.res.response(res, messages.success, true, 200, user)

        } else {
            await utils.res.response(res, messages.objectExists('user', 'email'), false, 200, null)
        }
    } catch (error) {
        next(error)
    }
}
exports.sendCode = async (req, res, next) => {
    try {
        const { email, type } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length > 0) {
            const code = randomString.generate({
                length: 4,
                charset: 'numeric'
            });
            const user = await usersClass.updateActivationCode({
                email,
                code,
                expireDate: moment().utc().add(2, 'm')
            })
            if (type == dataConstraint.sendCodeEnums.register) {
                utils["email"].verifyEmailRegisterCode(email, document[0].first_name, code).then().catch()
            }
            else if (type == dataConstraint.sendCodeEnums.forgotPassword) {
                utils["email"].forgotPasswordCode(email, document[0].first_name, code).then().catch()
            }
            else if (type == dataConstraint.sendCodeEnums.changePassword) {
                utils["email"].changePasswordCode(email, document[0].first_name, code).then().catch()
            }
            else if (type == dataConstraint.sendCodeEnums.verifyEmail) {
                utils["email"].verifyEmailCode(email, document[0].first_name, code).then().catch()
            }
            await utils.res.response(res, messages.codeSendSuccessfully, true, 200, user)

        } else {
            await utils.res.response(res, messages.noOneRegisteredWithEmail, false, 200, null)
        }
    } catch (error) {
        next(error)
    }

}

exports.sendTwoFactorCode = async (req, res, next) => {
    try {
        const { user } = req;
        const { email } = user;
        const code = randomString.generate({
            length: 4,
            charset: 'numeric'
        });
        await usersClass.updateActivationCode({
            email,
            code,
            expireDate: moment().utc().add(2, 'm')
        })
        utils["email"].twoFactorLoginCode(email, user.first_name, code).then().catch()
        await utils.res.response(res, messages.codeSendSuccessfully, true, 200, user)
    } catch (error) {
        console.log(error)
        next(error)
    }

}
exports.resetPassword = async (req, res, next) => {
    try {
        let { email, password, code } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length > 0) {
            if (document[0].email_verify) {
                // ask password for the user
                if (document[0].verification_code == code) {
                    if (moment(document[0].expire_date).isAfter(moment().utc().format())) {
                        const genSalt = await bcrypt.genSalt(dataConstraint.saltRounds)
                        const hashPassword = await bcrypt.hash(password, genSalt)
                        await usersClass.changePassword(document[0]._id, hashPassword);
                        await utils.res.response(res, messages.passwordReset, true, 200, null)
                    } else {
                        await utils.res.response(res, messages.codeExpired, false, 202, null)
                    }
                } else {
                    await utils.res.response(res, messages.invalidCode, false, 202, null)
                }

            } else {
                await utils.res.response(res, messages.emailNotVerify, false, 202, null)
            }
        } else {
            await utils.res.response(res, messages.wrongCredentials, false, 202, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }

}
exports.changePassword = async (req, res, next) => {
    try {
        const { user } = req;
        let { old_password, password } = req.body;
        if (await bcrypt.compare(old_password, user.password)) {
            // check if old password match
            let genSalt = await bcrypt.genSalt(dataConstraint.saltRounds)
            let hash_new_password = await bcrypt.hash(password, genSalt)
            await usersClass.changePassword(user._id, hash_new_password);
            await utils.res.response(res, messages.passwordChanged, true, 200, null)
        } else {
            await utils.res.response(res, messages.wrongCredentials, false, 200, null)
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

}
exports.verifyEmail = async (req, res, next) => {
    try {
        const { email, code, device_type, device_vendor, os, os_version, browser, browser_version } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length > 0) {
            if (document[0].email_verify) {
                await utils.res.response(res, messages.emailAlreadyVerified, false, 200, null)
            } else {
                if (document[0].verification_code == code) {
                    if (moment(document[0].expire_date).isAfter(moment().utc().format())) {
                        await usersClass.verifyEmailNumber(email);
                        const jwt_token = {
                            login_date: moment().utc().format(),
                            device_info: {
                                device_type,
                                device_vendor,
                                os,
                                os_version,
                                browser,
                                browser_version,
                            },
                        };
                        const profile = await usersClass.pushJWTToken(document[0]._id, jwt_token)
                        // Generate token
                        const token = await JWT.sign(
                            {
                                _id: profile._id,
                                email: profile.email,
                                date: moment().utc().format(),
                                deviceIdentity: profile.jwt_token[profile.jwt_token.length - 1]._id.toString(),
                                subject: dataConstraint.userType.users
                            }, process.env.JWT_SECRET, {
                            expiresIn: '2d',
                        });
                        await usersClass.updateUserJWTToken(profile._id, profile.jwt_token[profile.jwt_token.length - 1]._id.toString(), token)
                        let updatedObject = await utils.calculate.deleteKeys(profile, ['password', 'verification_code'])
                        updatedObject.jwt_token[updatedObject.jwt_token.length - 1] = {
                            ...updatedObject.jwt_token[updatedObject.jwt_token.length - 1],
                            token
                        }
                        await utils.res.response(res, messages.emailVerified, true, 200, updatedObject)
                    } else {
                        await utils.res.response(res, messages.codeExpired, false, 200, null)
                    }
                } else {
                    await utils.res.response(res, messages.invalidCode, false, 200, null)
                }
            }
        } else {
            await utils.res.response(res, messages.noOneRegisteredWithEmail, false, 200, null)
        }
    } catch (error) {
        next(error)
    }
}
exports.resetPassword = async (req, res, next) => {
    try {
        let { email, password, code } = req.body;
        const document = await usersClass.getUserByEmail(email)
        if (document.length > 0) {
            if (document[0].email_verify) {
                // ask password for the user
                if (document[0].verification_code == code) {
                    if (moment(document[0].expire_date).isAfter(moment().utc().format())) {
                        const genSalt = await bcrypt.genSalt(dataConstraint.saltRounds)
                        const hashPassword = await bcrypt.hash(password, genSalt)
                        await usersClass.changePassword(document[0]._id, hashPassword);
                        await utils.res.response(res, messages.passwordReset, true, 200, null)
                    } else {
                        await utils.res.response(res, messages.codeExpired, false, 202, null)
                    }
                } else {
                    await utils.res.response(res, messages.invalidCode, false, 202, null)
                }

            } else {
                await utils.res.response(res, messages.emailNotVerify, false, 202, null)
            }
        } else {
            await utils.res.response(res, messages.wrongCredentials, false, 202, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }

}


