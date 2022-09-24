class UserClass {
    constructor(model) {
        this.model = model;
    }
    async getUserByUserName(user_name) {
        try {
            return await this.model.find({user_name}, {
                "jwt_token.token": 0
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            return await this.model.find({email}, {
                "jwt_token.token": 0
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createUser({ email, first_name, last_name, hashPassword: password, expireDate: expire_date, code: verification_code }) {
        try {
            const user = new this.model({
                email, first_name, last_name, password, expire_date, verification_code
            })
            return await user.save();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async updateActivationCode({ email, expireDate: expire_date, code: verification_code }) {
        try {
            return await this.model.updateOne({ email }, {
                $set: {
                    expire_date, verification_code
                }
            })
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async updateTwoFactorVerify(_id, two_factor_verify) {
        try {
            return await this.model.updateOne({ _id }, {
                $set: {
                    two_factor_verify
                }
            })
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async verifyEmailNumber(email) {
        try {
            return await this.model.updateOne({ email }, {
                email_verify: true
            })
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async pushJWTToken(_id, jwt_token) {
        try {
            return await this.model.findOneAndUpdate({ _id }, {
                $push: { jwt_token }
            }, {
                new: true, projection: {
                    "jwt_token.token": 0
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async updateUserJWTToken(_id, jwt_id, token) {
        try {
            return await this.model.updateOne(
                {
                    $and: [{ _id }, { "jwt_token._id": jwt_id }]
                }, {
                $set: {
                    "jwt_token.$.token": token,
                }
            })
        } catch (err) {
            console.error(err);
            throw err;
        }

    }
    async removeToken(_id, jwt_token) {
        try {
            let updateVariable = jwt_token.length == 0 ? '$set' : '$pull'
            let value = jwt_token.length == 0 ? [] : {
                token: jwt_token
            }
            return await this.model.findOneAndUpdate({ _id }, {
                [updateVariable]: {
                    jwt_token: value
                }
            }, { new: true })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async changePassword(_id, password) {
        try {
            return await this.model.updateOne({ _id }, {
                $set: {
                    password
                }
            })
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
exports.UserClass = UserClass;